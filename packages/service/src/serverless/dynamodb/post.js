require("../../../../../babel.register");

module.exports.default = serverless => serverless.variables.tracker.promiseMap["self:provider.environment.SERVICE_POSTS_DYNAMODB_TABLE"].then(tableName => {
    const setupLocalDynamoDb = require("./util").setupLocal;

    setupLocalDynamoDb();

    const getPostModel = require("../../db/models/post").getModel;

    const postModel = getPostModel(tableName);

    return postModel.dynamooseModel.getTableReq();
});
