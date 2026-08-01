import dynamoose from "dynamoose";

const setupLocal = () => {
    // NOTE-RT: these two defaults are *unconditional*, unlike the endpoint override below, and that
    // leaks into the deployed CloudFormation template — `post.js`/`authInfo.js` call this before
    // reading the table name, and the Serverless CLI process never has these variables set, so
    // `sls print --stage prd` declares `local-posts`/`local-authInfo` while the functions are
    // configured to read `prd-service-…`. See the note above `PostsDynamoDbTable` in
    // `serverless.yml`; fixing it is a live DynamoDB table replacement, not a one-line edit.
    process.env.SERVICE_POSTS_DYNAMODB_TABLE = process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts";
    process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE || "local-authInfo";

    if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test" || !process.env.NODE_ENV) {
        // NOTE-RT: `region: "localhost"` makes the emulator reject every request with
        // `UnrecognizedClientException: The Access Key ID or security token is invalid.` (its SigV4
        // handling needs a real-looking region). Use the AWS-documented fake local credentials/region instead.
        //
        // NOTE-RT: `AWS_ENDPOINT_URL` is LocalStack's own recommended, non-deprecated way to point
        // a client at it, so honouring it means a caller can move the container without editing
        // source. The fallback is LocalStack's single edge port, not DynamoDB Local's 8000.
        dynamoose.aws.ddb.set(new dynamoose.aws.ddb.DynamoDB({
            region: "us-east-1",
            endpoint: process.env.AWS_ENDPOINT_URL || "http://localhost:4566",
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
