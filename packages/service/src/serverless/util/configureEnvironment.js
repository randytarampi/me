import dynamoose from "dynamoose";
import logger, {configureLogger} from "../../lib/logger";
import {XRayedAwsSdk} from "../../lib/util";
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
