import logger from "../../../lib/logger";
import RequestError, {codes} from "./requestError";

export default (querystringParameters = {}) => {
    if (!querystringParameters) {
        return {};
    }

    const numberProperties = [
        "page",
        "perPage"
    ];
    const parsedQuerystringParameters = {};

    numberProperties.forEach(property => {
        if (querystringParameters.hasOwnProperty(property)) {
            parsedQuerystringParameters[property] = Number(querystringParameters[property]);

            if (Number.isNaN(parsedQuerystringParameters[property])) {
                const error = new RequestError(`Expected \`${property}\` to be a number but got \`${querystringParameters[property]}\` instead`, codes.badRequest);
                logger.warn(error, error.message);
                throw error;
            }
        }
    });

    return {
        ...querystringParameters,
        ...parsedQuerystringParameters
    };
};
