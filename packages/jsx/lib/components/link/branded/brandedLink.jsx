import PropTypes from "prop-types";
import React from "react";
import Link from "../link";

export const BrandedLink = ({serviceName, serviceType, serviceUrl, username, useBranding, ...props}) => { // eslint-disable-line no-unused-vars
    return <Link
        text={username}
        href={`${serviceUrl}/${username}`}
        {...props}
        className={[`link--${serviceType}`, useBranding ? "" : "link--no-branding", props.className].join(" ").trim()}
    />;
};

BrandedLink.propTypes = {
    className: PropTypes.string,
    useBranding: PropTypes.bool,
    username: PropTypes.string.isRequired,
    serviceName: PropTypes.string,
    serviceType: PropTypes.string.isRequired,
    serviceUrl: PropTypes.string.isRequired,
};

BrandedLink.defaultProps = {
    useBranding: true
};

export default BrandedLink;
