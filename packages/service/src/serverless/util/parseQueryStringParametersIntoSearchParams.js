const PostSearchParams = require("../../lib/postSearchParams.js");

const parseQueryStringParametersIntoSearchParams = baseParameters => queryStringParameters => {
    return PostSearchParams.fromJSON({
        ...baseParameters,
        ...queryStringParameters
    });
};

module.exports = parseQueryStringParametersIntoSearchParams;
module.exports.parseQueryStringParametersIntoSearchParams = parseQueryStringParametersIntoSearchParams;
module.exports.default = module.exports;
