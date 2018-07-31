import PropTypes from "prop-types";
import React from "react";
import ExternalLink from "./externalLink";

export const F00pxLink = props => {
    return <ExternalLink {...props} serviceType="F00px" serviceName="500px" serviceUrl="https://www.500px.com"/>;
};

F00pxLink.propTypes = {
    username: PropTypes.string.isRequired
};

F00pxLink.defaultProps = {
    username: "randytarampi"
};

export default F00pxLink;
