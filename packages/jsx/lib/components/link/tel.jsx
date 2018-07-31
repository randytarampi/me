import PropTypes from "prop-types";
import React from "react";
import Link from "./link";

export const TelLink = ({useBranding, ...props}) => {
    return <Link {...props}
                 className={["link--tel", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
                 href={`tel:${props.tel}`} text={props.text || props.tel}/>;
};

TelLink.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    tel: PropTypes.string.isRequired,
    useBranding: PropTypes.bool,
};

TelLink.defaultProps = {
    useBranding: true,
    tel: "+16043747128"
};

export default TelLink;
