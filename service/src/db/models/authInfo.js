import {DynamooseModel} from "../dynamooseModel.js";
import AuthInfoSchema from "../schema/authInfo.js";

let model;

const getModel = (modelName = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE || "local-authInfo") => {
    if (!model) {
        model = new DynamooseModel(modelName, AuthInfoSchema);
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
