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
    const headerNames = Object.keys(headers).map(header => header.toLowerCase());
    const normalizedHeaderNames = headerNames.map(header => header.toLowerCase());

    headersToInspect.forEach(headerToInspect => {
        const normalizedHeaderName = headerToInspect.headerName.toLowerCase();
        if (normalizedHeaderNames.includes(normalizedHeaderName)) {
            const headerIndex = normalizedHeaderNames.indexOf(normalizedHeaderName);
            const unNormalizedHeaderName = headerNames[headerIndex];
            parsedHeaders[unNormalizedHeaderName] = headerToInspect.parseHeader(headers);
            try {
                headerToInspect.validateHeader(parsedHeaders);
            } catch (error) {
                logger.warn(error, error.message);
                throw error;
            }
        }
    });

    return {
        ...headers,
        ...parsedHeaders
    };
};
