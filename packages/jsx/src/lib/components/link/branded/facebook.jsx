import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const FacebookLink = props => {
    return <BrandedLink {...props} serviceName="Facebook" serviceType="facebook"
                        serviceUrl="https://www.facebook.com"/>;
};

FacebookLink.propTypes = {
    username: PropTypes.string.isRequired
};

FacebookLink.defaultProps = {
    username: "randytarampi"
};

export default FacebookLink;
