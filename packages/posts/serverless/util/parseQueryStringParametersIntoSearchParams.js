import SearchParams from "../../lib/searchParams";

export const parseQueryStringParametersIntoSearchParams = baseParameters => queryStringParameters => {
    return SearchParams.fromJS({
        ...baseParameters,
        ...queryStringParameters
    });
};

export default parseQueryStringParametersIntoSearchParams;
