const {DynamooseModel} = require("../dynamooseModel.js");
const AuthInfoSchema = require("../schema/authInfo.js");

let model;

const getModel = (modelName = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE || "local-authInfo") => {
    if (!model) {
        model = new DynamooseModel(modelName, AuthInfoSchema);
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
