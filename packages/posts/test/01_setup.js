import dynamoose from "dynamoose";

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.AWS.config.update({
        accessKeyId: "woof",
        secretAccessKey: "meow",
        region: "local"
    });
    dynamoose.local();
}
