import {Post} from "@randy.tarampi/js";
import Aws from "aws-sdk";
import jsyaml from "js-yaml";
import WordSource from "../wordSource";

class S3WordSource extends WordSource {
    constructor() {
        super("S3", new Aws.S3());
    }

    get isEnabled() {
        return process.env.S3_BUCKET_NAME;
    }

    getWordPosts(params) {
        const options = {
            Bucket: process.env.S3_BUCKET_NAME,
            MaxKeys: params.perPage || 20
        };

        if (params.page) {
            options.Marker = String(options.MaxKeys * (params.page - 1)); // FIXME-RT: Replace with `StartAfter`
        }

        return this.client.listObjects(options) // FIXME-RT: Replace with `listObjectsV2`
            .promise()
            .then(data => {
                return data;
            })
            .then(data => Promise.all(data.Contents.map((object) => {
                return this.getWordPost(object.Key);
            })));
    }

    getWordPost(key) {
        return this.client.getObject({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key
            })
            .promise()
            .then(data => {
                return this.jsonToPost(jsyaml.safeLoad(data.Body));
            });
    }

    jsonToPost(postJson) {
        return new Post(
            postJson.date,
            null,
            this.type,
            postJson.date,
            null,
            postJson.title,
            postJson.body
        );
    }
}

export default S3WordSource;
