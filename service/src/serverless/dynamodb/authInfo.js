import {setupLocal as setupLocalDynamoDb} from "./util.js";
import {getModel as getAuthInfoModel} from "../../db/models/authInfo.js";

export default () => {
    setupLocalDynamoDb();

    const tableName = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE;

    const authInfoModel = getAuthInfoModel(tableName);

    return authInfoModel.getCreateTableRequest();
};
