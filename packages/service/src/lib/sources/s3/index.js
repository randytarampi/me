import {Post} from "@randy.tarampi/js";
import {GetObjectCommand, ListObjectsV2Command, S3Client} from "@aws-sdk/client-s3";
import jsyaml from "js-yaml";
import CachedDataSource from "../../cachedDataSource.js";
import {filterPostForOrderingConditionsInSearchParams} from "../util.js";

const defaultRegion = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1";

const bodyToString = async body => {
    if (typeof body === "string") {
        return body;
    }

    if (Buffer.isBuffer(body)) {
        return body.toString("utf8");
    }

    if (body && typeof body.transformToString === "function") {
        return body.transformToString();
    }

    if (body && typeof body.text === "function") {
        return body.text();
    }

    if (body && typeof body[Symbol.asyncIterator] === "function") {
        let output = "";

        for await (const chunk of body) {
            output += Buffer.isBuffer(chunk) ? chunk.toString("utf8") : chunk;
        }

        return output;
    }

    return body;
};

class S3Source extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || new S3Client({region: defaultRegion}), cacheClient);
    }

    get isEnabled() {
        return !!process.env.SERVICE_POSTS_S3_BUCKET_NAME || false;
    }

    static get type() {
        return "s3";
    }

    static instanceToRecord(postJson) {
        return Post.fromJSON({
            raw: postJson,
            id: postJson.Key,
            source: S3Source.type,
            datePublished: postJson.date,
            title: postJson.title,
            body: postJson.body,
            tags: postJson.tags,
            lat: postJson.lat,
            long: postJson.long,
            geohash: postJson.geohash
        });
    }

    async recordsGetter(searchParams) {
        const {Contents = [], IsTruncated, NextContinuationToken} = await this.client.send(new ListObjectsV2Command(searchParams.S3));

        let posts = await Promise.all(Contents.map(object => {
                return this.getRecord(object.Key, searchParams);
            }))
            .then(posts => posts.filter(post => filterPostForOrderingConditionsInSearchParams(post, searchParams))
            );

        if (IsTruncated) {
            posts = posts.concat(await this.allRecordsGetter(
                searchParams
                    .set("continuationToken", NextContinuationToken)
            ));
        }

        return posts;
    }

    async allRecordsGetter(searchParams) {
        const posts = await this.recordsGetter(
            searchParams
                .set("all", true)
        );

        return posts;
    }

    recordGetter(key, searchParams) {
        return this.client.send(new GetObjectCommand(searchParams.set("id", key).S3))
            .then(async data => {
                if (!data) {
                    return null;
                }

                const body = await bodyToString(data.Body);

                return S3Source.instanceToRecord({
                    Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                    Key: key,
                    ...data,
                    Body: body,
                    ...(body ? jsyaml.load(body) : {})
                });
            });
    }
}

export default S3Source;
