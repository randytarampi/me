import {setupLocal as setupLocalDynamoDb} from "./util.js";
import {getModel as getPostModel} from "../../db/models/post.js";

export default () => {
    setupLocalDynamoDb();

    const tableName = process.env.SERVICE_POSTS_DYNAMODB_TABLE;

    const postModel = getPostModel(tableName);

    return postModel.getCreateTableRequest();
};
