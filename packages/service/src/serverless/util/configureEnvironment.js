const dynamoose = require("dynamoose");
const {Aws} = require("../aws.js");
const logger = require("../logger.js");
const {configureLogger} = logger;
const loadServerlessSecrets = require("./loadServerlessSecrets.js").default || require("./loadServerlessSecrets.js");

dynamoose.aws.sdk = Aws;

if (process.env.IS_OFFLINE || process.env.NODE_ENV === "test") {
    dynamoose.aws.ddb.local();
}

module.exports = () => {
    return loadServerlessSecrets()
        .then(() => {
            return configureLogger();
        })
        .catch(error => {
            logger.fatal(error, "Unexpected error configuring the lambda environment");
            throw error;
        });
};
module.exports.default = module.exports;
