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
        tab: <span>Posts</span>,
        routes: [
            {
                component: Posts,
                path: "/posts/:filter"
            },
            {
                component: Posts,
                path: "/posts/:filter/:filterValue"
            }
        ]
    },
    {
        component: Error,
        path: "/error"
    },
    {
        component: Error
    }
];

export default routes;
