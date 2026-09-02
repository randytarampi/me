import PropTypes from "prop-types";
import React from "react";
import BrandedLink from "./brandedLink.jsx";

export const AngelListLink = ({username = "randytarampi", ...props}) => {
    return <BrandedLink {...props} username={username} serviceName="AngelList" serviceType="angelList"
                        serviceUrl="https://angel.co"/>;
};

AngelListLink.propTypes = {
    username: PropTypes.string.isRequired
};


export default AngelListLink;
