const dynamoose = require("dynamoose");

const setupLocal = () => {
    process.env.SERVICE_POSTS_DYNAMODB_TABLE = process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts";
    process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE || "local-authInfo";

    if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test" || !process.env.NODE_ENV) {
        dynamoose.aws.ddb.set(new dynamoose.aws.ddb.DynamoDB({
            region: "localhost",
            endpoint: "http://localhost:8000",
            credentials: {
                accessKeyId: "MOCK_ACCESS_KEY_ID",
                secretAccessKey: "MOCK_SECRET_ACCESS_KEY"
            }
        }));
    }
};

module.exports = {
    setupLocal
};
module.exports.setupLocal = setupLocal;
module.exports.default = module.exports;
