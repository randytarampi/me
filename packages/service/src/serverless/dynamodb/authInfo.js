require("../../../../../babel.register");

module.exports.default = serverless => {
    return serverless.variables.tracker.promiseMap["self:provider.environment.SERVICE_AUTH_INFO_DYNAMODB_TABLE"].then(tableName => {
        const setupLocalDynamoDb = require("./util").setupLocal;

        setupLocalDynamoDb();

        const getAuthInfoModel = require("../../db/models/authInfo").getModel;

        const authInfoModel = getAuthInfoModel(tableName);

        return authInfoModel.dynamooseModel.getTableReq();
    });
};
