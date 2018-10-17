import React from "react";
import Error from "../../../src/lib/containers/error";
import Posts from "../../../src/lib/containers/posts";

const routes = [
    {
        component: Error,
        path: "/",
        exact: true,
        tab: <span>Home</span>
    },
    {
        component: Posts,
        path: "/posts",
        exact: true,
        tab: <span>Posts</span>
    },
    {
        component: Error,
        path: "/error",
        exact: true
    },
    {
        component: Error
    }
];

export default routes;
