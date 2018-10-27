import {augmentUrlWithTrackingParams} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React from "react";
import Link from "./link";

export const CampaignLink = ({useBranding, href, source, medium, name, term, content, ...props}) => {
    return <Link
        {...props}
        className={["link--campaign", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
        href={augmentUrlWithTrackingParams(href, {source, medium, name, term, content})}
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
    content: PropTypes.string
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
