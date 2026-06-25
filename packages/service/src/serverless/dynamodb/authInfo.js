const {setupLocal: setupLocalDynamoDb} = require("./util.js");
const {getModel: getAuthInfoModel} = require("../../db/models/authInfo.js");

module.exports = () => {
    setupLocalDynamoDb();

    const tableName = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE;

    const authInfoModel = getAuthInfoModel(tableName);

    return authInfoModel.getCreateTableRequest();
};
module.exports.default = module.exports;
