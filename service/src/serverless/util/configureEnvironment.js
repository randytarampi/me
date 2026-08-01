import dynamoose from "dynamoose";
import {Aws} from "../aws.js";
import logger, {configureLogger} from "../logger.js";

dynamoose.aws.sdk = Aws;

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.aws.ddb.local();
}

// NOTE-RT: there is no secret fetching left to do here. `provider.environment` in `serverless.yml`
// carries `${ssm:...}` references that the deployer resolves, so every credential is already in
// `process.env` by the time the runtime imports this module - one fewer SSM round trip per cold
// start, and one fewer thing that can fail after the function is already live.
//
// This still returns a promise even though `configureLogger()` is the only thing left in it. The
// handlers all `await` it, and the `.catch` is what turns a misconfigured environment into a single
// `fatal` log line rather than an unhandled rejection somewhere further in.
export default () => {
    return Promise.resolve()
        .then(() => {
            return configureLogger();
        })
        .catch(error => {
            logger.fatal(error, "Unexpected error configuring the lambda environment");
            throw error;
        });
};
