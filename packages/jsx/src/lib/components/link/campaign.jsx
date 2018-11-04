import {augmentUrlWithTrackingParams} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React from "react";
import {CampaignContext} from "../../contexts";
import Link from "./link";

export const CampaignLink = ({useBranding, href, source, medium, name, term, content, ...props}) => {
    return <CampaignContext.Consumer>
        {
            campaignContext => {
                const {
                    source: contextSource,
                    medium: contextMedium,
                    name: contextName,
                    term: contextTerm,
                    content: contextContent
                } = campaignContext || {};

                return <Link
                    {...props}
                    className={["link--campaign", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
                    href={augmentUrlWithTrackingParams(href, {
                        source: source || contextSource,
                        medium: medium || contextMedium,
                        name: name || contextName,
                        term: term || contextTerm,
                        content: content || contextContent
                    })}
                    text={props.text || href}
                />;
            }
        }
    </CampaignContext.Consumer>;
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
    useBranding: true
};

export default CampaignLink;
