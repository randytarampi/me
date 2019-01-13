import {Post} from "@randy.tarampi/js";
import jsyaml from "js-yaml";
import CachedDataSource from "../../cachedDataSource";
import {XRayedAwsSdk} from "../../util";
import {filterPostForOrderingConditionsInSearchParams} from "../util";

class S3Source extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || new XRayedAwsSdk.S3(), cacheClient);
    }

    get isEnabled() {
        return !!process.env.SERVICE_POSTS_S3_BUCKET_NAME || false;
    }

    async postsGetter(searchParams) {
        return this.client.listObjectsV2(searchParams.S3)
            .promise()
            .then(async ({Contents, IsTruncated, NextContinuationToken}) => {
                let posts = await Promise.all(Contents.map(object => {
                        return this.getPost(object.Key, searchParams);
                    }))
                    .then(posts => posts.filter(post => filterPostForOrderingConditionsInSearchParams(post, searchParams))
                    );

                if (IsTruncated) {
                    posts = posts.concat(await this.allPostsGetter(
                        searchParams
                            .set("continuationToken", NextContinuationToken)
                    ));
                }

                return posts;
            });
    }

    async allPostsGetter(searchParams) {
        const posts = await this.postsGetter(
            searchParams
                .set("all", true)
        );

        return posts;
    }

    static get type() {
        return "s3";
    }

    static jsonToPost(postJson) {
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

    postGetter(key, searchParams) {
        return this.client.getObject(searchParams.set("id", key).S3)
            .promise()
            .then(data => {
                return data && S3Source.jsonToPost({
                    Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                    Key: key,
                    ...data,
                    ...jsyaml.safeLoad(data.Body)
                });
            });
    }
}

export default S3Source;
