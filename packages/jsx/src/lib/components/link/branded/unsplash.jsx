import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const UnsplashLink = props => {
    return <BrandedLink {...props} serviceName="Unsplash" serviceType="unsplash"
                        serviceUrl="https://www.unsplash.com"/>;
};

UnsplashLink.propTypes = {
    username: PropTypes.string.isRequired
};

UnsplashLink.defaultProps = {
    username: "randytarampi"
};

export default UnsplashLink;
