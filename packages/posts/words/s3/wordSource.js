import {Post} from "@randy.tarampi/js";
import Aws from "aws-sdk";
import jsyaml from "js-yaml";
import {DateTime} from "luxon";
import WordSource from "../wordSource";

class S3WordSource extends WordSource {
    constructor(dataClient, cacheClient) {
        super("S3",
            dataClient || new Aws.S3(),
            cacheClient
        );
    }

    get isEnabled() {
        return process.env.S3_BUCKET_NAME;
    }

    postsGetter(searchParams) {
        return this.client.listObjects(searchParams.S3) // FIXME-RT: Replace with `listObjectsV2`
            .promise()
            .then(data => Promise.all(data.Contents.map(object => {
                return this.getPost(object.Key, searchParams);
            })));
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
        return new Post(
            postJson.Key,
            null,
            this.type,
            DateTime.fromISO(postJson.date),
            null,
            postJson.title,
            postJson.body
        );
    }
}

export default S3WordSource;
