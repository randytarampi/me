import {RequestError} from "@randy.tarampi/js";
import logger from "../../logger";

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
        if (Object.prototype.hasOwnProperty.call(querystringParameters, property)) {
            parsedQuerystringParameters[property] = Number(querystringParameters[property]);

            if (Number.isNaN(parsedQuerystringParameters[property])) {
                const error = new RequestError(`Expected \`${property}\` to be a number but got \`${querystringParameters[property]}\` instead`, RequestError.codes.badRequest);
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
