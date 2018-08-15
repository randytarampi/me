import PropTypes from "prop-types";
import React from "react";
import Link from "./link";

export const SmsLink = ({useBranding, ...props}) => {
    return <Link {...props}
                 className={["link--sms", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
                 href={`sms:${props.tel}${props.body ? `;?&body=${encodeURIComponent(props.body)}` : ""}`}
                 text={props.text || props.tel}/>;
};

SmsLink.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    tel: PropTypes.string.isRequired,
    body: PropTypes.string,
    useBranding: PropTypes.bool,
};

SmsLink.defaultProps = {
    useBranding: true,
    tel: "+16043747128"
};

export default SmsLink;
