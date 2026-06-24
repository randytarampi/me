import {configureLogger as genericConfigureLogger, createLogger} from "@randy.tarampi/lambda-logger";
const packageJson = require("../../package.json");

export const configureLogger = () => genericConfigureLogger(packageJson);

export default createLogger(packageJson);
