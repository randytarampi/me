import {ConnectedError, ConnectedPosts} from "@randy.tarampi/jsx";
import {ConnectedLetter} from "@randy.tarampi/letter";
import {ConnectedResume} from "jsonresume-theme-randytarampi";
import React, {Fragment} from "react";
import Helmet from "react-helmet";
import Main from "../views/main";

export const PhotosRouteHandler = () => <Fragment>
    <Helmet>
        <title>📸</title>
    </Helmet>
    <ConnectedPosts fetchUrl={`${__PHOTOS_SERVICE_URL__}`}/>
</Fragment>;
export const WordsRouteHandler = () => <Fragment>
    <Helmet>
        <title>📝</title>
    </Helmet>
    <ConnectedPosts fetchUrl={`${__WORDS_SERVICE_URL__}`}/>
</Fragment>;
export const BlogRouteHandler = () => <Fragment>
    <Helmet>
        <title>📸📝</title>
    </Helmet>
    <ConnectedPosts fetchUrl={`${__POSTS_SERVICE_URL__}`}/>
</Fragment>;

const routes = [
    {
        component: Main,
        exact: true,
        path: "/"
    },
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
        component: BlogRouteHandler,
        exact: true,
        path: "/blog"
    },
    {
        component: ConnectedResume,
        path: "/resume/:variant?"
    },
    {
        component: ConnectedLetter,
        path: "/letter/:variant?"
    },
    {
        component: ConnectedError,
        path: "*"
    }
];

export default routes;
