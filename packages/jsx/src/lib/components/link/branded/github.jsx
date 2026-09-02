import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const GitHubLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink {...props} username={username} serviceName="GitHub" serviceType="github" serviceUrl="https://www.github.com"/>;
};

GitHubLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default GitHubLink;
