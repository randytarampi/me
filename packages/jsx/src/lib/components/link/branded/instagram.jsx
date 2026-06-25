import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const InstagramLink = props => {
    return <BrandedLink {...props} serviceName="Instagram" serviceType="instagram"
                        serviceUrl="https://www.instagram.com"/>;
};

InstagramLink.propTypes = {
    username: PropTypes.string.isRequired
};

InstagramLink.defaultProps = {
    username: "randytarampi"
};

export default InstagramLink;
