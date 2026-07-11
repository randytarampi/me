import {configureAwsSdk} from "@randy.tarampi/serverless";
import logger from "./logger.js";

const Aws = configureAwsSdk(logger);

export default Aws;

export {Aws};
