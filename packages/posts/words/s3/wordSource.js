import Post from "@randy.tarampi/js/lib/post";
import jsyaml from "js-yaml";
import knox from "knox";
import WordSource from "../wordSource";

class S3WordSource extends WordSource {
    constructor() {
        super("S3", knox.createClient({
            key: process.env.AWS_ACCESS_KEY_ID,
            secret: process.env.AWS_SECRET_ACCESS_KEY,
            bucket: process.env.S3_BUCKET_NAME
        }));
    }

    get isEnabled() {
        return process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.S3_BUCKET_NAME;
    }

    getWordPosts(params) {
        const options = {
            "max-keys": params.perPage || 20
        };

        if (params.page) {
            options.marker = options["max-keys"] * (params.page - 1);
        }

        return new Promise((resolve, reject) => {
            this.client.list(options, (error, data) => {
                if (error) {
                    return reject(error);
                }

                resolve(Promise.all(data.Contents.map((object) => {
                    return this.getWordPost(object.Key);
                })));
            });
        });
    }

    getWordPost(key) {
        return new Promise((resolve, reject) => {
            this.client.getFile(key, (error, response) => {
                if (error) {
                    return reject(error);
                }

                let responseYamlString = "";
                response.on("data", (chunk) => {
                    responseYamlString += chunk;
                });
                response.on("end", () => {
                    resolve(responseYamlString);
                });
            });
        })
            .then((yamlString) => {
                return this.jsonToPost(jsyaml.safeLoad(yamlString));
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
