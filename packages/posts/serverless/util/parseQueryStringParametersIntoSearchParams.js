import SearchParams from "../../lib/searchParams";

export const parseQueryStringParametersIntoSearchParams = baseParameters => queryStringParameters => {
    return SearchParams.fromJSON({
        ...baseParameters,
        ...queryStringParameters
    });
};

export default parseQueryStringParametersIntoSearchParams;
