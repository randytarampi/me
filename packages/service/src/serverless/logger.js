const {configureLogger: genericConfigureLogger, createLogger} = require("@randy.tarampi/lambda-logger");
const packageJson = require("../../package.json");

const configureLogger = () => genericConfigureLogger(packageJson);

module.exports = createLogger(packageJson);
module.exports.configureLogger = configureLogger;
module.exports.default = module.exports;
