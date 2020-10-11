import dynamoose from "dynamoose";
import {Aws} from "../aws";
import logger, {configureLogger} from "../logger";
import loadServerlessSecrets from "./loadServerlessSecrets";

dynamoose.aws.sdk = Aws;

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.aws.ddb.local();
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
