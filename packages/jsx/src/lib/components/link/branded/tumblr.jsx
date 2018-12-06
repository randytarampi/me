import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const TumblrLink = ({username, ...props}) => {
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

TumblrLink.defaultProps = {
    username: "randytarampi"
};

export default TumblrLink;
