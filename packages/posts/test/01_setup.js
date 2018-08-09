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

process.env.FLICKR_API_KEY = "FLICKR_API_KEY";
process.env.TUMBLR_USER_NAME = "TUMBLR_USER_NAME";
process.env.S3_BUCKET_NAME = "S3_BUCKET_NAME";
