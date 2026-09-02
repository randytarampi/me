import PropTypes from "prop-types";
import React from "react";
import Link from "./link.jsx";

export const SmsLink = ({useBranding = true, tel = "+16043747128", ...props}) => {
    return <Link {...props}
                 className={["link--sms", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
                 href={`sms:${tel}${props.body ? `;?&body=${encodeURIComponent(props.body)}` : ""}`}
                 text={props.text || tel}/>;
};

SmsLink.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    tel: PropTypes.string.isRequired,
    body: PropTypes.string,
    useBranding: PropTypes.bool,
};


export default SmsLink;
