import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const FlickrLink = props => {
    return <BrandedLink {...props} serviceName="Flickr" serviceType="flickr"
                        serviceUrl="https://www.flickr.com/people"/>;
};

FlickrLink.propTypes = {
    username: PropTypes.string.isRequired
};

FlickrLink.defaultProps = {
    username: "randytarampi"
};

export default FlickrLink;
