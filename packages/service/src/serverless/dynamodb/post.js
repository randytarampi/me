const {setupLocal: setupLocalDynamoDb} = require("./util.js");
const {getModel: getPostModel} = require("../../db/models/post.js");

module.exports = () => {
    setupLocalDynamoDb();

    const tableName = process.env.SERVICE_POSTS_DYNAMODB_TABLE;

    const postModel = getPostModel(tableName);

    return postModel.getCreateTableRequest();
};
module.exports.default = module.exports;
