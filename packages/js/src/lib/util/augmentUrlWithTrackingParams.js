// @ts-check
import queryString from "query-string";

const CAMPAIGN_SOURCE = globalThis.__CAMPAIGN_SOURCE__ ?? "";
const CAMPAIGN_MEDIUM = globalThis.__CAMPAIGN_MEDIUM__ ?? "referral";
const CAMPAIGN_NAME = globalThis.__CAMPAIGN_NAME__ ?? "";
const CAMPAIGN_TERM = globalThis.__CAMPAIGN_TERM__ ?? "";
const CAMPAIGN_CONTENT = globalThis.__CAMPAIGN_CONTENT__ ?? "";

/**
 * Add UTM params to a URL without trampling the ones already there.
 * @param {string} href - The URL to decorate.
 * @param {{source?: string, medium?: string, name?: string, term?: string, content?: string}} [campaign={}] - Campaign bits.
 * @returns {string} The URL with tracking params baked in.
 */
export const augmentUrlWithTrackingParams = (href, {source = CAMPAIGN_SOURCE, medium = CAMPAIGN_MEDIUM, name = CAMPAIGN_NAME, term = CAMPAIGN_TERM, content = CAMPAIGN_CONTENT} = {}) => {
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
