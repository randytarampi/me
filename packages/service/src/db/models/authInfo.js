import {DynamooseModel} from "../dynamooseModel.js";
import AuthInfoSchema from "../schema/authInfo.js";

export const getModel = (modelName = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE) => new DynamooseModel(modelName, AuthInfoSchema);

export default getModel();
