import {Post} from "@randy.tarampi/js";
import jsyaml from "js-yaml";
import CachedDataSource from "../../lib/cachedDataSource";
import XRayedAwsSdk from "../../serverless/util/xRayedAwsSdk";

class S3Source extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super("S3",
            dataClient || new XRayedAwsSdk.S3(),
            cacheClient
        );
    }

    get isEnabled() {
        return !!process.env.S3_BUCKET_NAME || false;
    }

    async postsGetter(searchParams) {
        return this.client.listObjectsV2(searchParams.S3)
            .promise()
            .then(async ({Contents, IsTruncated, NextContinuationToken}) => {
                let posts = await Promise.all(Contents.map(object => {
                    return this.getPost(object.Key, searchParams);
                }));

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

    postGetter(key, searchParams) {
        return this.client.getObject(searchParams.set("id", key).S3)
            .promise()
            .then(data => {
                return data && this.jsonToPost({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: key,
                    ...data,
                    ...jsyaml.safeLoad(data.Body)
                });
            });
    }

    jsonToPost(postJson) {
        return Post.fromJSON({
            raw: postJson,
            id: postJson.Key,
            source: this.type,
            datePublished: postJson.date,
            title: postJson.title,
            body: postJson.body
        });
    }
}

export default S3Source;
