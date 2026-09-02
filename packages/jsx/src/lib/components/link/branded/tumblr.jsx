import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const TumblrLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink
        serviceName="Tumblr"
        serviceType="tumblr"
        serviceUrl="https://www.tumblr.com"
        href={`https://${username}.tumblr.com`}
        username={username}
        {...props}
    />;
};

TumblrLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default TumblrLink;
