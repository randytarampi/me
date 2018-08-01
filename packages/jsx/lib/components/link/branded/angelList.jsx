import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink";

export const AngelListLink = props => {
    return <BrandedLink {...props} serviceName="AngelList" serviceType="angelList"
                        serviceUrl="https://www.angellist.com"/>;
};

AngelListLink.propTypes = {
    username: PropTypes.string.isRequired
};

AngelListLink.defaultProps = {
    username: "randytarampi"
};

export default AngelListLink;
