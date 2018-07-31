import PropTypes from "prop-types";
import React from "react";
import ExternalLink from "./externalLink";

export const GitHubLink = props => {
    return <ExternalLink {...props} serviceName="GitHub" serviceType="github" serviceUrl="https://www.github.com"/>;
};

GitHubLink.propTypes = {
    username: PropTypes.string.isRequired
};

GitHubLink.defaultProps = {
    username: "randytarampi"
};

export default GitHubLink;
