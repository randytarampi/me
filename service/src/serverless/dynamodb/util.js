import dynamoose from "dynamoose";

const setupLocal = () => {
    process.env.SERVICE_POSTS_DYNAMODB_TABLE = process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts";
    process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE || "local-authInfo";

    if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test" || !process.env.NODE_ENV) {
        // NOTE-RT: `region: "localhost"` makes DynamoDB Local reject every request with
        // `UnrecognizedClientException: The Access Key ID or security token is invalid.` (its SigV4
        // handling needs a real-looking region). Use the AWS-documented fake local credentials/region instead.
        dynamoose.aws.ddb.set(new dynamoose.aws.ddb.DynamoDB({
            region: "us-east-1",
            endpoint: "http://localhost:8000",
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
