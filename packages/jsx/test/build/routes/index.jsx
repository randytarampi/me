import React from "react";
import Posts from "../../../src/lib/containers/posts";
import Error from "../../../src/lib/containers/error";

const routes = [
    {
        component: Posts,
        path: "/",
        tab: <span>Posts</span>
    },
    {
        component: Error,
        path: "/:unsupportedPath+"
    }
];

export default routes;
