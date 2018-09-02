import dynamoose from "dynamoose";

process.env.POSTS_DYNAMODB_TABLE = process.env.POSTS_DYNAMODB_TABLE || `${process.env.NODE_ENV}-posts`;

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.AWS.config.update({
        accessKeyId: "woof",
        secretAccessKey: "meow",
        region: "local"
    });
    dynamoose.local();
}

process.env.LOCAL_DIRECTORY = "LOCAL_DIRECTORY";

process.env.FLICKR_API_KEY = "FLICKR_API_KEY";
process.env.FLICKR_API_SECRET = "FLICKR_API_SECRET";

process.env.TUMBLR_USER_NAME = "TUMBLR_USER_NAME";
process.env.TUMBLR_API_KEY = "TUMBLR_API_KEY";
process.env.TUMBLR_API_SECRET = "TUMBLR_API_SECRET";

process.env.S3_BUCKET_NAME = "S3_BUCKET_NAME";

process.env.UNSPLASH_API_KEY = "UNSPLASH_API_KEY";
process.env.UNSPLASH_API_SECRET = "UNSPLASH_API_SECRET";
process.env.UNSPLASH_USER_NAME = "UNSPLASH_USER_NAME";

process.env.INSTAGRAM_ACCESS_TOKEN = "INSTAGRAM_ACCESS_TOKEN";
process.env.INSTAGRAM_USER_ID = "INSTAGRAM_USER_ID";
process.env.INSTAGRAM_USER_NAME = "INSTAGRAM_USER_NAME";

process.env.SENTRY_DSN = "https://meow@sentry.io/woof";
process.env.LOGGER_ENABLED = "true";
process.env.LOGGER_STREAM_HUMAN_ENABLED = "true";
process.env.LOGGER_STREAM_STDOUT_ENABLED = "false";
process.env.LOGGER_STREAM_SENTRY_ENABLED = "false";
process.env.LOGGER_SRC_ENABLED = "true";
