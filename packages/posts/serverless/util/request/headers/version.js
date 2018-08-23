import RequestError, {codes} from "../requestError";

/**
 * Define the header name for specifying the desired ME API version
 * @type {string}
 */
export const ME_API_VERSION_HEADER = "ME-API-VERSION";

export const headerName = ME_API_VERSION_HEADER;

export const parseHeader = headers => {
    return Number(getHeaderValue(headers));
};

export const validateHeader = headers => {
    const headerValue = getHeaderValue(headers);

    if (!headerValue) {
        return true;
    }

    if (!Number.isFinite(headerValue)) {
        throw new RequestError(`Expected \`${headerName}\` to be a number but got \`${headerValue}\` instead`, codes.badRequest);
    } else if (headerValue > 0) {
        return true;
    } else {
        throw new RequestError(`\`${headerName}\` is invalid`, codes.badRequest);
    }
};

export const getHeaderValue = headers => {
    const normalizedHeaderKeys = Object.keys(headers).map(header => header.toLowerCase());
    const headerValues = Object.values(headers);
    const normalizedHeaderName = headerName.toLowerCase();
    const headerValueIndex = normalizedHeaderKeys.indexOf(normalizedHeaderName);

    if (headerValueIndex > -1) {
        return headerValues[headerValueIndex];
    }

    return undefined;
};

export const checkHeader = (headers, expectedHeaderValue) => {
    const headerValue = getHeaderValue(headers);

    if (!headerValue) {
        return true;
    }

    if (headerValue >= expectedHeaderValue && headerValue < Math.floor(expectedHeaderValue + 1)) {
        return true;
    }

    return false;
};
