import React from "react";
import Error from "../../../src/lib/containers/error";
import Posts from "../../../src/lib/containers/posts";

const routes = [
    {
        component: Error,
        path: "/",
        tab: <span>Home</span>
    },
    {
        component: Posts,
        path: "/posts",
        tab: <span>Posts</span>
    },
    {
        component: Error,
        path: "/error"
    }
];

export default routes;
