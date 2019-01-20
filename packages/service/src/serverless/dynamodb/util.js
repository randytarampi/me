const dynamoose = require("dynamoose");

const setupLocal = () => {
    process.env.SERVICE_POSTS_DYNAMODB_TABLE = process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts";
    process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE || "local-authInfo";

    if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test" || !process.env.NODE_ENV) {
        dynamoose.AWS.config.update({
            accessKeyId: "MOCK_ACCESS_KEY_ID",
            secretAccessKey: "MOCK_SECRET_ACCESS_KEY",
            region: "localhost"
        });
        dynamoose.local();
    }
};

module.exports = {
    setupLocal
};
