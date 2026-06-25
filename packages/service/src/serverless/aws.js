const {configureAwsSdk} = require("@randy.tarampi/serverless");
const logger = require("./logger.js");

const Aws = configureAwsSdk(logger);

module.exports = Aws;
module.exports.Aws = Aws;
module.exports.default = module.exports;
