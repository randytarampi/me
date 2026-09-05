import {wrapHandler} from "@randy.tarampi/lambda-logger";
import "../../util/configureEnvironment.js";
import index from "./index.js";

export default wrapHandler(index);
