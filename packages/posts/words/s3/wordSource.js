import {Post} from "@randy.tarampi/js";
import Aws from "aws-sdk";
import jsyaml from "js-yaml";
import WordSource from "../wordSource";
import SearchParams from "../../lib/searchParams";

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

    postsGetter(params = {}) {
        params = params instanceof SearchParams ? params : SearchParams.fromJS(params);

        const options = {
            Bucket: process.env.S3_BUCKET_NAME,
            MaxKeys: params.perPage || 20
        };

        if (params.page) {
            options.Marker = String(options.MaxKeys * (params.page - 1)); // FIXME-RT: Replace with `StartAfter`
        }

        return this.client.listObjects(options) // FIXME-RT: Replace with `listObjectsV2`
            .promise()
            .then(data => Promise.all(data.Contents.map((object) => {
                return this.getPost(object.Key);
            })));
    }

    postGetter(key) {
        return this.client.getObject({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: key
            })
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
            postJson.date,
            null,
            postJson.title,
            postJson.body
        );
    }
}

export default S3WordSource;
