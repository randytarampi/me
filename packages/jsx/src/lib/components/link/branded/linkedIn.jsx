import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const LinkedInLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink {...props} username={username} serviceName="LinkedIn" serviceType="linkedin"
                        serviceUrl="https://www.linkedin.com/in"/>;
};

LinkedInLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default LinkedInLink;
