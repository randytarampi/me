import dynamoose from "dynamoose";
import {XRayedAwsSdk} from "../../lib/util";
import logger, {configureLogger} from "../logger";
import loadServerlessSecrets from "./loadServerlessSecrets";

dynamoose.AWS = XRayedAwsSdk;

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.local();
}

export default () => {
    return loadServerlessSecrets()
        .then(() => {
            return configureLogger();
        })
        .catch(error => {
            logger.fatal(error, "Unexpected error configuring the lambda environment");
            throw error;
        });
};
