import {DynamooseModel} from "../dynamooseModel.js";
import PostSchema from "../schema/post.js";

let model;

const getModel = (modelName = process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts") => {
    if (!model) {
        model = new DynamooseModel(modelName, PostSchema);
    }

    return model;
};

export default new Proxy({}, {
    get(_target, prop) {
        return getModel()[prop];
    },
    set(_target, prop, value) {
        getModel()[prop] = value;
        return true;
    }
});

export {getModel};
