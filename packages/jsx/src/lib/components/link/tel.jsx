import PropTypes from "prop-types";
import React from "react";
import Link from "./link.jsx";

export const TelLink = ({useBranding = true, tel = "+16043747128", ...props}) => {
    return <Link {...props}
                 className={["link--tel", useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
                 href={`tel:${tel}`} text={props.text || tel}/>;
};

TelLink.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    tel: PropTypes.string.isRequired,
    useBranding: PropTypes.bool,
};


export default TelLink;
