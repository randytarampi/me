import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const UnsplashLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink {...props} username={username} serviceName="Unsplash" serviceType="unsplash"
                        serviceUrl="https://www.unsplash.com"/>;
};

UnsplashLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default UnsplashLink;
