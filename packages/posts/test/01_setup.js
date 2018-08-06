import dynamoose from "dynamoose";

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.local();
}
