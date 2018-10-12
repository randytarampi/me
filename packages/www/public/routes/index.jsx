import {ConnectedError, ConnectedPosts} from "@randy.tarampi/jsx";
import {ConnectedLetter} from "@randy.tarampi/letter";
import {ConnectedResume} from "@randy.tarampi/resume";
import pathToRegExp from "path-to-regexp";
import React from "react";
import Main from "../views/main";

export const PhotosRouteHandler = () => <ConnectedPosts type="Photo" fetchUrl={`${__PHOTOS_SERVICE_URL__}`}/>;
export const WordsRouteHandler = () => <ConnectedPosts type="Post" fetchUrl={`${__WORDS_SERVICE_URL__}`}/>;
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
        component: PhotosRouteHandler,
        exact: true,
        path: "/photos",
        index: 2
    },
    {
        component: WordsRouteHandler,
        exact: true,
        path: "/words",
        index: 3
    },
    {
        component: ConnectedLetter,
        path: "/letter/:variant?",
        index: 4
    },
    {
        component: ConnectedResume,
        path: "/resume/:variant?",
        index: 5
    },
    {
        component: ConnectedError,
        index: 6
    }
].map(augmentWithPathRegExp);

export default routes;
