import PropTypes from "prop-types";
import React from "react";
import ExternalLink from "./externalLink";

export const LinkedInLink = props => {
    return <ExternalLink {...props} serviceName="LinkedIn" serviceType="linkedIn"
                         serviceUrl="https://www.linkedin.com/in"/>;
};

LinkedInLink.propTypes = {
    username: PropTypes.string.isRequired
};

LinkedInLink.defaultProps = {
    username: "randytarampi"
};

export default LinkedInLink;
