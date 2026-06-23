require("../../../../../babel.register");

module.exports.default = () => {
    const setupLocalDynamoDb = require("./util").setupLocal;

    setupLocalDynamoDb();

    const tableName = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE;

    const getAuthInfoModel = require("../../db/models/authInfo").getModel;

    const authInfoModel = getAuthInfoModel(tableName);

    return authInfoModel.getCreateTableRequest();
};
