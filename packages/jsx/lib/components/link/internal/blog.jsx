import React from "react";
import InternalLink from "./internalLink";

export const BlogAppLink = props => {
    return <InternalLink {...props} serviceType="blog" serviceName="Blog" href={__POSTS_APP_URL__}/>;
};

export default BlogAppLink;
