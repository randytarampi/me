import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const StackOverflowLink = props => {
    return <BrandedLink {...props} serviceName="StackOverflow" serviceType="stackOverflow"
                        serviceUrl="https://stackoverflow.com/story"/>;
};

StackOverflowLink.propTypes = {
    username: PropTypes.string.isRequired
};

StackOverflowLink.defaultProps = {
    username: "randytarampi"
};

export default StackOverflowLink;
