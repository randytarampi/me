import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const LinkedInLink = props => {
    return <BrandedLink {...props} serviceName="LinkedIn" serviceType="linkedin"
                        serviceUrl="https://www.linkedin.com/in"/>;
};

LinkedInLink.propTypes = {
    username: PropTypes.string.isRequired
};

LinkedInLink.defaultProps = {
    username: "randytarampi"
};

export default LinkedInLink;
