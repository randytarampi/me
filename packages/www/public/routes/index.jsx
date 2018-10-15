import {ConnectedError, ConnectedPosts} from "@randy.tarampi/jsx";
import {ConnectedLetter} from "@randy.tarampi/letter";
import {ConnectedResume} from "@randy.tarampi/resume";
import pathToRegExp from "path-to-regexp";
import React from "react";
import {Redirect} from "react-router";
import Main from "../views/main";

export const PhotosRouteHandler = () => <Redirect to="/blog"/>;
export const WordsRouteHandler = () => <Redirect to="/blog"/>;
export const BlogRouteHandler = () => <ConnectedPosts fetchUrl={`${__POSTS_SERVICE_URL__}`}/>;

const augmentWithPathRegExp = ({routes, ...route}) => {
    if (route.path) {
        route.pathRegExp = pathToRegExp(route.path);
    }

    if (routes) {
        route.routes = routes.map(augmentWithPathRegExp);
    }

    return route;
};

const routes = [
    {
        component: Main,
        exact: true,
        path: "/",
        index: 0
    },
    {
        component: BlogRouteHandler,
        exact: true,
        path: "/blog",
        index: 1
    },
    {
        component: ConnectedLetter,
        path: "/letter/:variant?",
        index: 2
    },
    {
        component: ConnectedResume,
        path: "/resume/:variant?",
        index: 3
    },

    // NOTE-RT: We need to render these redirect in `ReduxRouterRoot` for them to work so these need to be pulled out
    {
        component: PhotosRouteHandler,
        exact: true,
        path: "/photos"
    },
    {
        component: WordsRouteHandler,
        exact: true,
        path: "/words"
    },

    {
        component: ConnectedError,
        path: "/:unsupportedPath+"
    }
].map(augmentWithPathRegExp);

export default routes;
