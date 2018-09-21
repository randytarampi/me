import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const TwitterLink = props => {
    return <BrandedLink {...props} serviceName="Twitter" serviceType="twitter"
                        serviceUrl="https://www.twitter.com"/>;
};

TwitterLink.propTypes = {
    username: PropTypes.string.isRequired
};

TwitterLink.defaultProps = {
    username: "randytarampi"
};

export default TwitterLink;
