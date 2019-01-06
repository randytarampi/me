const dynamoose = require("dynamoose");

const setupLocal = () => {
    process.env.SERVICE_POSTS_DYNAMODB_TABLE = process.env.SERVICE_POSTS_DYNAMODB_TABLE || `${process.env.NODE_ENV}-posts`;

    if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
        dynamoose.AWS.config.update({
            accessKeyId: "woof",
            secretAccessKey: "meow",
            region: "local"
        });
        dynamoose.local();
    }
};

module.exports = {
    setupLocal
};
