import dynamoose from "dynamoose";
import XRayedAwsSdk from "./xRayedAwsSdk";
import logger, {configureLogger} from "../../lib/logger";
import loadServerlessSecrets from "./loadServerlessSecrets";

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.local();
} else {
    dynamoose.setDDB(new XRayedAwsSdk.dynamoDB());
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
