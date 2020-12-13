require("../../../../../babel.register");

module.exports.default =  serverless => serverless.variables.getValueFromSelf("self:provider.environment.SERVICE_AUTH_INFO_DYNAMODB_TABLE")
    .then(tableName => {
        console.log("tableName", tableName);
        const setupLocalDynamoDb = require("./util").setupLocal;

        setupLocalDynamoDb();

        const getAuthInfoModel = require("../../db/models/authInfo").getModel;

        const authInfoModel = getAuthInfoModel(tableName);

        return authInfoModel.dynamooseModel.table.create.request();
    });
