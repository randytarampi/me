import {DynamooseModel} from "../dynamooseModel.js";
import PostSchema from "../schema/post.js";

export const getModel = (modelName = process.env.SERVICE_POSTS_DYNAMODB_TABLE) => new DynamooseModel(modelName, PostSchema);

export default getModel();
