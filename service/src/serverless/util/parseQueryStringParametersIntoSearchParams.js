import PostSearchParams from "../../lib/postSearchParams.js";

const parseQueryStringParametersIntoSearchParams = baseParameters => queryStringParameters => {
    return PostSearchParams.fromJSON({
        ...baseParameters,
        ...queryStringParameters
    });
};

export default parseQueryStringParametersIntoSearchParams;

export {parseQueryStringParametersIntoSearchParams};
