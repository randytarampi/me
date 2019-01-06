require("../../../../../babel.register");

const getPostModel = require("../../db/models/post").getModel;

module.exports = serverless => serverless.variables.tracker.promiseMap["self:provider.environment.SERVICE_POSTS_DYNAMODB_TABLE"].then(tableName => {
    const model = getPostModel(tableName);

    return model.getTableReq();
});
