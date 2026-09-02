import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const StackOverflowLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink {...props} username={username} serviceName="StackOverflow" serviceType="stackOverflow"
                        serviceUrl="https://stackoverflow.com/story"/>;
};

StackOverflowLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default StackOverflowLink;
