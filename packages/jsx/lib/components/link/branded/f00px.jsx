import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const F00pxLink = props => {
    return <BrandedLink {...props} serviceType="f00px" serviceName="500px" serviceUrl="https://www.500px.com"/>;
};

F00pxLink.propTypes = {
    username: PropTypes.string.isRequired
};

F00pxLink.defaultProps = {
    username: "randytarampi"
};

export default F00pxLink;
