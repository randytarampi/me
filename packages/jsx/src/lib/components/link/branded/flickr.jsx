import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const FlickrLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink {...props} username={username} serviceName="Flickr" serviceType="flickr"
                        serviceUrl="https://www.flickr.com/people"/>;
};

FlickrLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default FlickrLink;
