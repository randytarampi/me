import logger from "../../../lib/logger";
import * as version from "./headers/version";

export default headers => {
    if (!headers) {
        return headers;
    }

    const headersToInspect = [
        version
    ];
    const parsedHeaders = {};

    headersToInspect.forEach(headerToInspect => {
        if (headers.hasOwnProperty(headerToInspect.headerName)) {
            parsedHeaders[headerToInspect.headerName] = headerToInspect.parseHeader(headers);
            try {
                headerToInspect.validateHeader(parsedHeaders);
            } catch (error) {
                logger.warn(error.message, error);
                throw error;
            }
        }
    });

    return {
        ...headers,
        ...parsedHeaders
    };
};
