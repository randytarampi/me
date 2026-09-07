import {Gallery, Photo, POST_TYPES, RequestError} from "@randy.tarampi/js";
import logger from "../logger.js";
import {getModel as getPostModel} from "../../db/models/post.js";
import {sources} from "../../lib/sources/index.js";
import {cachedValueToPost} from "../../lib/sources/searchPosts.js";
import parseHiddenPostSources from "./parseHiddenPostSources.js";

const PUBLIC_FEED_INDEX_NAME = "publicFeed-datePublished-index";
const VISIBLE_FEED_INDEX_NAME = "status-datePublished-index";
const CURSOR_PATTERN = /^[A-Za-z0-9_-]+$/;
const REGISTERED_SOURCE_NAMES = Object.freeze(Object.keys(sources).sort());

const encodeCursor = cursor => Buffer.from(JSON.stringify(cursor)).toString("base64url");
const decodeCursor = cursor => {
    if (!cursor || typeof cursor !== "string" || !CURSOR_PATTERN.test(cursor)) {
        throw new RequestError("`continuationToken` is invalid", RequestError.codes.badRequest);
    }
    try {
        const decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
        if (!decoded || typeof decoded !== "object" || Array.isArray(decoded)) throw new Error("invalid cursor");
        return decoded;
    } catch {
        throw new RequestError("`continuationToken` is invalid", RequestError.codes.badRequest);
    }
};

const mergePublicFeedShards = async ({shards, perPage, fetchPage, cursor} = {}) => {
    const states = await Promise.all(shards.map(async partition => ({
        partition,
        cursor,
        page: await fetchPage(partition, cursor, perPage + 1),
        index: 0
    })));
    const returned = [];
    const seen = new Set();
    const metrics = {refills: 0, pages: states.length, evaluated: 0, rejected: 0, duplicates: 0};

    const refill = async state => {
        if (!state.page.hasMore) return;
        const page = await fetchPage(state.partition, state.page.nextCursor, perPage + 1);
        state.page = page;
        state.index = 0;
        state.cursor = page.nextCursor;
        metrics.refills++;
        metrics.pages++;
    };

    while (returned.length <= perPage) {
        const available = states.filter(state => state.page.posts[state.index]);
        if (!available.length) {
            const refillable = states.filter(state => state.page.hasMore);
            if (!refillable.length) break;
            await Promise.all(refillable.map(refill));
            continue;
        }

        const state = available.sort((left, right) => String(right.page.posts[right.index].publicFeedSort).localeCompare(String(left.page.posts[left.index].publicFeedSort)))[0];
        const post = state.page.posts[state.index++];
        metrics.evaluated++;
        if (!post || !post.uid || !post.publicFeedSort) {
            metrics.rejected++;
        } else if (seen.has(post.uid)) {
            metrics.duplicates++;
        } else {
            seen.add(post.uid);
            returned.push(post);
        }

        if (state.index >= state.page.posts.length && state.page.hasMore) {
            await refill(state);
        }
    }

    const hasMore = returned.length > perPage || states.some(state => state.page.hasMore && state.page.posts[state.index]);
    const posts = returned.slice(0, perPage);
    return {
        posts,
        hasMore,
        nextCursor: hasMore && posts.length ? encodeCursor({sort: posts[posts.length - 1].publicFeedSort}) : undefined,
        metrics: {...metrics, returned: posts.length}
    };
};

const postTypesForQuery = type => type === Photo.type || type === Gallery.type
    ? [Gallery.type, Photo.type]
    : type ? [type] : POST_TYPES;

const getVisibleFeedPartitions = ({types, source, hiddenSources, registeredSources = REGISTERED_SOURCE_NAMES}) => {
    const sourceSet = (source ? [source] : registeredSources).filter(sourceName => registeredSources.includes(sourceName));
    return types.flatMap(postType => sourceSet
        .filter(sourceName => !hiddenSources.includes(sourceName))
        .map(sourceName => `VISIBLE#${postType}#${sourceName}`));
};

const isAfterCursor = (post, cursor) => !cursor
    || post.datePublished < cursor.datePublished
    || (post.datePublished === cursor.datePublished && String(post.uid).localeCompare(String(cursor.uid)) < 0);

const mergePublicFeedPages = async ({perPage, fetchPage, cursor, policy, metrics = {}} = {}) => {
    const returned = [];
    const seen = new Set();
    let pageCursor;
    let hasMore = true;
    let refills = 0;
    let pages = 0;
    let evaluated = 0;
    let filtered = 0;
    let rejected = 0;
    let duplicates = 0;

    while (returned.length <= perPage && hasMore) {
        let page;
        try {
            const startedAt = Date.now();
            // The extra record establishes hasMore without exposing DynamoDB's LastEvaluatedKey.
            page = await fetchPage(pageCursor, perPage + 1, ++pages);
            logger.info({
                index: VISIBLE_FEED_INDEX_NAME,
                page: pages,
                durationMs: Date.now() - startedAt,
                Count: page.count,
                ScannedCount: page.scannedCount,
                evaluated: page.evaluated,
                returned: page.posts.length,
                filtered: page.filtered,
                rejected: page.rejected,
                duplicates: page.duplicates,
                refills,
                consumedCapacity: page.consumedCapacity || null
            }, "public feed DynamoDB page");
        } catch (error) {
            logger.error({index: VISIBLE_FEED_INDEX_NAME, page: pages, errorStage: "query"}, "public feed DynamoDB page failed");
            throw error;
        }

        evaluated += page.evaluated;
        filtered += page.filtered;
        rejected += page.rejected;
        duplicates += page.duplicates;
        for (const post of page.posts) {
            if (returned.length > perPage) break;
            if (!isAfterCursor(post, cursor)) continue;
            if (seen.has(post.uid)) {
                duplicates++;
                continue;
            }
            seen.add(post.uid);
            returned.push(post);
        }

        hasMore = Boolean(page.lastKey);
        pageCursor = page.lastKey;
        if (returned.length <= perPage && hasMore) {
            refills++;
        }
    }

    const posts = returned.slice(0, perPage);
    const nextCursor = hasMore && posts.length ? encodeCursor({v: 5, d: "descending", policy, datePublished: posts[posts.length - 1].datePublished, uid: posts[posts.length - 1].uid}) : undefined;
    return {posts, hasMore, nextCursor, metrics: {...metrics, pages, refills, evaluated, returned: posts.length, filtered, rejected, duplicates}};
};

const isEligibleVisibleRecord = ({record, types, source, hiddenSources}) => {
    const recordSource = record && record.source;
    return recordSource && REGISTERED_SOURCE_NAMES.includes(recordSource)
        && !hiddenSources.includes(recordSource)
        && (!source || source === recordSource)
        && (!types.length || types.includes(record.type));
};

const getConsumedCapacity = page => page.consumedCapacity || page.ConsumedCapacity || null;

const readVisibleFeed = async ({model, type, source, tags, perPage, cursor, hiddenSources, policy} = {}) => {
    const types = postTypesForQuery(type);
    const fetchPage = async (exclusiveStartKey, limit) => {
        let query = model.dynamooseModel.query("status").eq("VISIBLE")
            .using(VISIBLE_FEED_INDEX_NAME).sort("descending").limit(limit);
        const queryCursor = exclusiveStartKey || (cursor && {datePublished: cursor.datePublished});
        if (queryCursor) query = query.where("datePublished").le(new Date(queryCursor.datePublished));
        if (tags) query = query.filter("tags").contains(tags);
        const page = await query.exec();
        let filtered = 0;
        let rejected = 0;
        let duplicates = 0;
        const seenPage = new Set();
        const posts = [];
        for (const record of page) {
            if (!isEligibleVisibleRecord({record, types, source, hiddenSources})) {
                filtered++;
                continue;
            }
            const post = cachedValueToPost(record);
            if (!post || !post.datePublished) {
                rejected++;
                continue;
            }
            if (seenPage.has(post.uid)) {
                duplicates++;
                continue;
            }
            seenPage.add(post.uid);
            posts.push(post);
        }
        return {
            posts,
            lastKey: page.lastKey,
            count: page.count,
            scannedCount: page.scannedCount,
            evaluated: page.length,
            filtered,
            rejected,
            duplicates,
            consumedCapacity: getConsumedCapacity(page)
        };
    };
    return mergePublicFeedPages({perPage, fetchPage, cursor, policy});
};

const getPostsV5 = async ({type, source, tags, status, perPage = 100, continuationToken, ...queryParameters} = {}) => {
    const startedAt = Date.now();
    const legacyCursorParameters = ["beforeDate", "afterDate", "beforeId", "afterId", "orderBy", "orderOperator", "orderComparator", "page"];
    if (legacyCursorParameters.some(parameter => queryParameters[parameter] !== undefined)) {
        throw new RequestError("V5 accepts continuationToken instead of legacy cursor parameters", RequestError.codes.badRequest);
    }
    if (status && status !== "VISIBLE") {
        throw new RequestError("V5 only supports visible posts", RequestError.codes.badRequest);
    }
    if (Object.keys(queryParameters).length) {
        throw new RequestError("V5 does not support this query shape", RequestError.codes.badRequest);
    }
    const hiddenSources = parseHiddenPostSources();
    const types = postTypesForQuery(type);
    const registeredSources = REGISTERED_SOURCE_NAMES.filter(sourceName => !hiddenSources.includes(sourceName));
    const partitions = getVisibleFeedPartitions({types, source, hiddenSources, registeredSources: REGISTERED_SOURCE_NAMES});
    const exactSourceShape = Boolean(type && source);
    const policy = JSON.stringify({direction: "descending", hiddenSources, registeredSources, query: {type: type || null, source: source || null, tags: tags || null, status: status || "VISIBLE", ...queryParameters}});
    const decodedCursor = continuationToken ? decodeCursor(continuationToken) : null;
    if (decodedCursor && (decodedCursor.v !== 5 || decodedCursor.d !== "descending" || decodedCursor.policy !== policy || !decodedCursor.datePublished || !Date.parse(decodedCursor.datePublished) || typeof decodedCursor.uid !== "string" || (exactSourceShape && !decodedCursor.sort))) {
        throw new RequestError("`continuationToken` does not match this request", RequestError.codes.badRequest);
    }
    const model = getPostModel();
    if (!exactSourceShape) {
        const result = await readVisibleFeed({model, type, source, tags, perPage: Math.max(1, Number(perPage)), cursor: decodedCursor && {datePublished: decodedCursor.datePublished, uid: decodedCursor.uid}, hiddenSources, policy});
        logger.info({v: 5, index: VISIBLE_FEED_INDEX_NAME, durationMs: Date.now() - startedAt, ...result.metrics}, "public feed query");
        return result;
    }
    const fetchPage = async (partition, cursor, limit) => {
        let query = model.dynamooseModel.query("publicFeedPartition").eq(partition)
            .using(PUBLIC_FEED_INDEX_NAME).sort("descending").limit(limit);
        if (cursor) query = query.where("publicFeedSort").lt(cursor);
        if (tags) query = query.filter("tags").contains(tags);
        const page = await query.exec();
        return {
            posts: page.map(record => {
                return cachedValueToPost(record);
            }),
            hasMore: Boolean(page.lastKey),
            nextCursor: page.lastKey && page.lastKey.publicFeedSort
        };
    };
    const result = await mergePublicFeedShards({shards: partitions, perPage: Math.max(1, Number(perPage)), fetchPage, cursor: decodedCursor && decodedCursor.sort});
    if (result.hasMore) {
        result.nextCursor = encodeCursor({v: 5, d: "descending", policy, datePublished: result.posts[result.posts.length - 1].datePublished, uid: result.posts[result.posts.length - 1].uid, sort: result.posts[result.posts.length - 1].publicFeedSort});
    }
    logger.info({v: 5, partitions: partitions.length, durationMs: Date.now() - startedAt, ...result.metrics}, "public feed query");
    return result;
};

export {decodeCursor, encodeCursor, getPostsV5, getVisibleFeedPartitions, mergePublicFeedPages, mergePublicFeedShards, readVisibleFeed, REGISTERED_SOURCE_NAMES};
export default getPostsV5;
