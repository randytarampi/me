import PropTypes from "prop-types";
import queryString from "query-string";
import React from "react";
import Link from "./link";

export const EmailLink = ({useBranding, ...props}) => {
    return <Link {...props}
                 className={["link--email", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
                 target="_self"
                 href={`mailto:${props.email}${props.body || props.subject ? `?${queryString.stringify({
                     body: props.body,
                     subject: props.subject
                 })}` : ""}`} text={props.text || props.email}/>;
};

EmailLink.propTypes = {
    useBranding: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    body: PropTypes.string,
    subject: PropTypes.string,
    email: PropTypes.string.isRequired
};

EmailLink.defaultProps = {
    useBranding: true,
    email: "jobs@randytarampi.ca"
};

export default EmailLink;
