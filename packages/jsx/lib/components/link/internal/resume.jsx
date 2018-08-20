import React from "react";
import InternalLink from "./internalLink";

export const ResumeAppLink = props => {
    return <InternalLink {...props} serviceType="resume" serviceName="Resume" href={__RESUME_APP_URL__}/>;
};

export default ResumeAppLink;
