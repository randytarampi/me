import queryString from "query-string";

export const augmentUrlWithTrackingParams = (href, {source = __CAMPAIGN_SOURCE__, medium = __CAMPAIGN_MEDIUM__, name = __CAMPAIGN_NAME__, term = __CAMPAIGN_TERM__, content = __CAMPAIGN_CONTENT__} = {}) => {
    const parsedHref = queryString.parseUrl(href);
    const hrefUrl = parsedHref.url;
    const hrefQueryParameters = parsedHref.query;
    const passedCampaignParameters = {
        utm_source: source,
        utm_medium: medium,
        utm_campaign: name,
        utm_term: term,
        utm_content: content
    };
    const combinedQueryParameters = {
        ...passedCampaignParameters,
        ...hrefQueryParameters
    };
    const combinedQueryString = queryString.stringify(
        Object.keys(combinedQueryParameters)
            .reduce((definedParameters, key) => {
                if (![undefined, null].includes(combinedQueryParameters[key])) {
                    definedParameters[key] = combinedQueryParameters[key];
                }
                return definedParameters;
            }, {})
    );

    return hrefUrl + (combinedQueryString ? ("?" + combinedQueryString) : "");
};

export default augmentUrlWithTrackingParams;
