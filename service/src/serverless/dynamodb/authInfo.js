import {setupLocal as setupLocalDynamoDb} from "./util.js";
import {getModel as getAuthInfoModel} from "../../db/models/authInfo.js";

// NOTE-RT: see the note in `post.js`. Same defect, same fix - the name is resolved from
// `custom.authInfoTableName` rather than read out of the CLI process's environment, where it never
// existed, and an unresolved name throws rather than falling back to `local-authInfo`.
export default async ({resolveConfigurationProperty}) => {
    setupLocalDynamoDb();

    const tableName = await resolveConfigurationProperty(["custom", "authInfoTableName"]);

    if (!tableName) {
        throw new Error("`custom.authInfoTableName` did not resolve; refusing to fall back to a default table name.");
    }

    const authInfoModel = getAuthInfoModel(tableName);

    return authInfoModel.getCreateTableRequest();
};
