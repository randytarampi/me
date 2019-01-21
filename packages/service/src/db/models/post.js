import {DynamooseModel} from "../dynamooseModel";
import PostSchema from "../schema/post";

export const getModel = (modelName = process.env.SERVICE_POSTS_DYNAMODB_TABLE) => new DynamooseModel(modelName, PostSchema);

export default getModel();
