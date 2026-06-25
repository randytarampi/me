const {DynamooseModel} = require("../dynamooseModel.js");
const PostSchema = require("../schema/post.js");

let model;

const getModel = (modelName = process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts") => {
    if (!model) {
        model = new DynamooseModel(modelName, PostSchema);
    }

    return model;
};

module.exports = new Proxy({}, {
    get(_target, prop) {
        return getModel()[prop];
    },
    set(_target, prop, value) {
        getModel()[prop] = value;
        return true;
    }
});
module.exports.getModel = getModel;
module.exports.default = module.exports;
