import {augmentUrlWithTrackingParams} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React from "react";
import {CampaignContext} from "../../contexts";
import {InternalLink} from "./internal";
import {Link} from "./link";

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
                let LinkComponent = Link;
                let actualHref = augmentUrlWithTrackingParams(href, {
                    source: source || contextSource,
                    medium: medium || contextMedium,
                    name: name || contextName,
                    term: term || contextTerm || props.text,
                    content: content || contextContent
                });

                if (href && href.startsWith(window.location.origin)) {
                    LinkComponent = InternalLink;
                    actualHref = href.replace(window.location.origin, "");
                }

                return <LinkComponent
                    {...props}
                    className={["link--campaign", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
                    href={actualHref}
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
