import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const SoundCloudLink = props => {
    return <BrandedLink {...props} serviceName="SoundCloud" serviceType="soundCloud"
                        serviceUrl="https://soundcloud.com/"/>;
};

SoundCloudLink.propTypes = {
    username: PropTypes.string.isRequired
};

SoundCloudLink.defaultProps = {
    username: "randytarampi"
};

export default SoundCloudLink;
