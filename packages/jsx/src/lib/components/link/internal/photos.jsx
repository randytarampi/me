import React from "react";
import InternalLink from "./internalLink";

export const PhotosAppLink = props => {
    return <InternalLink {...props} serviceType="photos" serviceName="Photos" href={__PHOTOS_APP_URL__}/>;
};

export default PhotosAppLink;
