import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const SoundCloudLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink {...props} username={username} serviceName="SoundCloud" serviceType="soundCloud"
                        serviceUrl="https://soundcloud.com/"/>;
};

SoundCloudLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default SoundCloudLink;
