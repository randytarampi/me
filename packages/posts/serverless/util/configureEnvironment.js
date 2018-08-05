import dynamoose from "dynamoose";
import {configureLogger} from "../../logger";
import loadServerlessSecrets from "./loadServerlessSecrets";

export default () => {
    return loadServerlessSecrets()
        .then(() => {
            if (process.env.IS_OFFLINE) {
                dynamoose.local();
            }
            return configureLogger();
        });
};
