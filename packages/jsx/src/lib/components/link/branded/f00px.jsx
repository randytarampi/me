import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const F00pxLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink {...props} username={username} serviceType="f00px" serviceName="500px" serviceUrl="https://www.500px.com"/>;
};

F00pxLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default F00pxLink;
