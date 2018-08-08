import logger from "../../lib/logger";
import responseBuilder from "./responseBuilder";

export default callback => error => {
    logger.error(error);
    callback(error, responseBuilder({
        error: "An unexpected error occurred"
    }, 500));
};
