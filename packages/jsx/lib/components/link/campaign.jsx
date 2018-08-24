import PropTypes from "prop-types";
import queryString from "query-string";
import React from "react";
import Link from "./link";

export const CampaignLink = ({useBranding, href, source, medium, name, term, content, ...props}) => {
    const parsedHref = queryString.parseUrl(href);
    const hrefUrl = parsedHref.url;
    const hrefQueryParameters = parsedHref.query;
    const passedCampaignParameters = {
        utm_source: source,
        utm_medium: medium,
        utm_name: name,
        utm_term: term,
        utm_content: content
    };
    const augmentedHref = hrefUrl + "?" + queryString.stringify({
        ...passedCampaignParameters,
        ...hrefQueryParameters
    });

    return <Link
        {...props}
        className={["link--campaign", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
        href={augmentedHref}
        text={props.text || href}
    />;
};

CampaignLink.propTypes = {
    useBranding: PropTypes.bool,
    className: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string,
    source: PropTypes.string,
    medium: PropTypes.string,
    name: PropTypes.string,
    term: PropTypes.string,
    content: PropTypes.string,
};

CampaignLink.defaultProps = {
    useBranding: true,
    source: __CAMPAIGN_SOURCE__ || undefined,
    medium: __CAMPAIGN_MEDIUM__ || undefined,
    name: __CAMPAIGN_NAME__ || undefined,
    term: __CAMPAIGN_TERM__ || undefined,
    content: __CAMPAIGN_CONTENT__ || undefined
};

export default CampaignLink;
