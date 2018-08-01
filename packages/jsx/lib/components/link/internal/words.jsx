import React from "react";
import InternalLink from "./internalLink";

export const WordsAppLink = props => {
    return <InternalLink {...props} serviceType="words" serviceName="Words" href={__WORDS_APP_URL__}/>;
};

export default WordsAppLink;
