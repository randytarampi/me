import dynamoose from "dynamoose";
import {configureLogger} from "../../logger";
import loadServerlessSecrets from "./loadServerlessSecrets";

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.local();
}

export default () => {
    return loadServerlessSecrets()
        .then(() => {
            return configureLogger();
        });
};
