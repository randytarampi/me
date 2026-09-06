import {getEntityForType, Gallery, Photo, POST_TYPES, Post, RequestError} from "@randy.tarampi/js";
import logger from "../logger.js";
import {getModel as getPostModel} from "../../db/models/post.js";
import {sources} from "../../lib/sources/index.js";
import parseHiddenPostSources from "./parseHiddenPostSources.js";

const INDEX_NAME = "publicFeed-datePublished-index";
const CURSOR_PATTERN = /^[A-Za-z0-9_-]+$/;

const encodeCursor = cursor => Buffer.from(JSON.stringify(cursor)).toString("base64url");
const decodeCursor = cursor => {
    if (!cursor || typeof cursor !== "string" || !CURSOR_PATTERN.test(cursor)) {
        throw new RequestError("`continuationToken` is invalid", RequestError.codes.badRequest);
    }
    try {
        return JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));
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

const getVisibleFeedPartitions = ({types, source, hiddenSources, registeredSources = Object.keys(sources)}) => {
    const sourceSet = source ? [source] : registeredSources;
    return types.flatMap(postType => sourceSet
        .filter(sourceName => !hiddenSources.includes(sourceName))
        .map(sourceName => `VISIBLE#${postType}#${sourceName}`));
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
    const partitions = getVisibleFeedPartitions({types, source, hiddenSources});
    const policy = JSON.stringify({direction: "descending", hiddenSources, partitions, query: {tags: tags || null, status: status || "VISIBLE", ...queryParameters}});
    const decodedCursor = continuationToken ? decodeCursor(continuationToken) : null;
    if (decodedCursor && (decodedCursor.v !== 5 || decodedCursor.d !== "descending" || decodedCursor.policy !== policy || !decodedCursor.sort)) {
        throw new RequestError("`continuationToken` does not match this request", RequestError.codes.badRequest);
    }
    const model = getPostModel();
    const fetchPage = async (partition, cursor, limit) => {
        let query = model.dynamooseModel.query("publicFeedPartition").eq(partition)
            .using(INDEX_NAME).sort("descending").limit(limit);
        if (cursor) query = query.where("publicFeedSort").lt(cursor);
        if (tags) query = query.filter("tags").contains(tags);
        const page = await query.exec();
        return {
            posts: page.map(record => {
                try {
                    return (getEntityForType(record.type) || Post).fromJSON(record);
                } catch {
                    return null;
                }
            }),
            hasMore: Boolean(page.lastKey),
            nextCursor: page.lastKey && page.lastKey.publicFeedSort
        };
    };
    const result = await mergePublicFeedShards({shards: partitions, perPage: Math.max(1, Number(perPage)), fetchPage, cursor: decodedCursor && decodedCursor.sort});
    if (result.hasMore) {
        result.nextCursor = encodeCursor({v: 5, d: "descending", policy, sort: result.posts[result.posts.length - 1].publicFeedSort});
    }
    logger.info({v: 5, partitions: partitions.length, durationMs: Date.now() - startedAt, ...result.metrics}, "public feed query");
    return result;
};

export {decodeCursor, encodeCursor, getPostsV5, getVisibleFeedPartitions, mergePublicFeedShards};
export default getPostsV5;
