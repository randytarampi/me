import {configureLogger as genericConfigureLogger, createLogger} from "@randy.tarampi/lambda-logger";
import packageJson from "../../package.json" with {type: "json"};

const configureLogger = () => genericConfigureLogger(packageJson);

export default createLogger(packageJson);

export {configureLogger};
