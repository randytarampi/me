import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const GitHubLink = props => {
    return <BrandedLink {...props} serviceName="GitHub" serviceType="github" serviceUrl="https://www.github.com"/>;
};

GitHubLink.propTypes = {
    username: PropTypes.string.isRequired
};

GitHubLink.defaultProps = {
    username: "randytarampi"
};

export default GitHubLink;
