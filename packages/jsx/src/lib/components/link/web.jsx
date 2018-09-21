import PropTypes from "prop-types";
import React from "react";
import Link from "./link";

export const WebLink = ({useBranding, ...props}) => {
    return <Link {...props}
                 className={["link--web", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
                 text={props.text || props.href}/>;
};

WebLink.propTypes = {
    useBranding: PropTypes.bool,
    className: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string
};

WebLink.defaultProps = {
    useBranding: true
};

export default WebLink;
