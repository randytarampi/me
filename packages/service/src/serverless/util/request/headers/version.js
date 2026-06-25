const {RequestError} = require("@randy.tarampi/js");

/**
 * Define the header name for specifying the desired ME API version
 * @type {string}
 */
const ME_API_VERSION_HEADER = "ME-API-VERSION";

const headerName = ME_API_VERSION_HEADER;

const parseHeader = headers => {
    return Number(getHeaderValue(headers));
};

const validateHeader = headers => {
    const headerValue = getHeaderValue(headers);

    if (!headerValue) {
        return true;
    }

    if (!Number.isFinite(headerValue)) {
        throw new RequestError(`Expected \`${headerName}\` to be a number but got \`${headerValue}\` instead`, RequestError.codes.badRequest);
    } else if (headerValue > 0) {
        return true;
    } else {
        throw new RequestError(`\`${headerName}\` is invalid`, RequestError.codes.badRequest);
    }
};

const getHeaderValue = (headers = {}) => {
    const normalizedHeaderKeys = Object.keys(headers).map(header => header.toLowerCase());
    const headerValues = Object.values(headers);
    const normalizedHeaderName = headerName.toLowerCase();
    const headerValueIndex = normalizedHeaderKeys.indexOf(normalizedHeaderName);

    if (headerValueIndex > -1) {
        return headerValues[headerValueIndex];
    }

    return undefined;
};

const checkHeader = (headers, expectedHeaderValue) => {
    const headerValue = getHeaderValue(headers);

    if (!headerValue) {
        return true;
    }

    if (headerValue >= expectedHeaderValue && headerValue < Math.floor(expectedHeaderValue + 1)) {
        return true;
    }

    return false;
};
module.exports.ME_API_VERSION_HEADER = ME_API_VERSION_HEADER;
module.exports.headerName = headerName;
module.exports.parseHeader = parseHeader;
module.exports.validateHeader = validateHeader;
module.exports.getHeaderValue = getHeaderValue;
module.exports.checkHeader = checkHeader;
module.exports.default = module.exports;
