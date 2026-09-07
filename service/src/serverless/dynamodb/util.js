import dynamoose from "dynamoose";

const setupLocal = () => {
    // NOTE-RT: Lambda does not set NODE_ENV. Do not treat an unset NODE_ENV as local: deployed
    // `dev`/`prd` functions use real stage table names and must keep the SDK's configured client.
    // The local harness and test suite explicitly identify themselves with one of these flags.
    if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
        const endpoint = process.env.AWS_ENDPOINT_URL || "http://localhost:4566";
        const parsedEndpoint = new URL(endpoint);
        if (!["localhost", "127.0.0.1", "::1"].includes(parsedEndpoint.hostname)) {
            throw new Error(`Refusing local DynamoDB endpoint outside loopback: ${endpoint}`);
        }
        for (const [name, value] of Object.entries({
            SERVICE_POSTS_DYNAMODB_TABLE: process.env.SERVICE_POSTS_DYNAMODB_TABLE,
            SERVICE_AUTH_INFO_DYNAMODB_TABLE: process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE
        })) {
            if (value && !/^local-[A-Za-z0-9-]+$/.test(value)) throw new Error(`Refusing local DynamoDB table ${name}=${value}`);
        }

        // NOTE-RT: these two defaults used to sit *outside* this guard, which meant they applied to
        // the Serverless CLI process as well - and `post.js`/`authInfo.js` then read the table name
        // back out of `process.env`, so every rendered template declared `local-posts` /
        // `local-authInfo` regardless of stage. They resolve the name from the configuration now
        // (see the note in `post.js`), so these defaults serve only their original purpose: giving
        // `migrate.js` and the test suite a table to talk to when nothing else has named one.
        process.env.SERVICE_POSTS_DYNAMODB_TABLE = process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts";
        process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE || "local-authInfo";

        // NOTE-RT: `region: "localhost"` makes the emulator reject every request with
        // `UnrecognizedClientException: The Access Key ID or security token is invalid.` (its SigV4
        // handling needs a real-looking region). Use the AWS-documented fake local credentials/region instead.
        //
        // NOTE-RT: `AWS_ENDPOINT_URL` is LocalStack's own recommended, non-deprecated way to point
        // a client at it, so honouring it means a caller can move the container without editing
        // source. The fallback is LocalStack's single edge port, not DynamoDB Local's 8000.
        process.env.AWS_ENDPOINT_URL = endpoint;
        dynamoose.aws.ddb.set(new dynamoose.aws.ddb.DynamoDB({
            region: "us-east-1",
            endpoint,
            credentials: {
                accessKeyId: "fakeMyKeyId",
                secretAccessKey: "fakeSecretAccessKey"
            }
        }));
    }
};

export default {
    setupLocal
};

export {setupLocal};
