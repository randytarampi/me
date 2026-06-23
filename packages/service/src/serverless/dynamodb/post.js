require("../../../../../babel.register");

module.exports.default = () => {
    const setupLocalDynamoDb = require("./util").setupLocal;

    setupLocalDynamoDb();

    const tableName = process.env.SERVICE_POSTS_DYNAMODB_TABLE;

    const getPostModel = require("../../db/models/post").getModel;

    const postModel = getPostModel(tableName);

    return postModel.getCreateTableRequest();
};
