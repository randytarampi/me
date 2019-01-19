import PostSearchParams from "../../lib/postSearchParams";

export const parseQueryStringParametersIntoSearchParams = baseParameters => queryStringParameters => {
    return PostSearchParams.fromJSON({
        ...baseParameters,
        ...queryStringParameters
    });
};

export default parseQueryStringParametersIntoSearchParams;
