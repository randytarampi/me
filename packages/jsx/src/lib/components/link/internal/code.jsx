import React from "react";
import InternalLink from "./internalLink";

export const CodeAppLink = props => {
    return <InternalLink {...props} serviceType="code" serviceName="Code" href={__CODE_APP_URL__}/>;
};

export default CodeAppLink;
