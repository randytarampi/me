import PropTypes from "prop-types";
import React from "react";
import Link from "../link";

export const ExternalLink = ({serviceName, serviceType, serviceUrl, username, ...props}) => {
    return <Link
        text={serviceName}
        {...props}
        className={[`link--${serviceType}`, props.className].join(" ").trim()}
        href={`${serviceUrl}/${username}`}
    />;
};

ExternalLink.propTypes = {
    className: PropTypes.string,
    username: PropTypes.string.isRequired,
    serviceName: PropTypes.string.isRequired,
    serviceType: PropTypes.string.isRequired,
    serviceUrl: PropTypes.string.isRequired,
};

export default ExternalLink;
