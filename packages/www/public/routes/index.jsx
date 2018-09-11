import {Error, Posts} from "@randy.tarampi/jsx";
import Letter from "@randy.tarampi/letter/lib/components/letter";
import Resume from "jsonresume-theme-randytarampi/public/components/resume";
import React, {Fragment} from "react";
import Helmet from "react-helmet";
import Main from "../views/main";

export const PhotosRouteHandler = () => <Fragment>
    <Helmet>
        <title>📸</title>
    </Helmet>
    <Posts fetchUrl={`${__PHOTOS_SERVICE_URL__}`}/>
</Fragment>;
export const WordsRouteHandler = () => <Fragment>
    <Helmet>
        <title>📝</title>
    </Helmet>
    <Posts fetchUrl={`${__WORDS_SERVICE_URL__}`}/>
</Fragment>;
export const BlogRouteHandler = () => <Fragment>
    <Helmet>
        <title>📸📝</title>
    </Helmet>
    <Posts fetchUrl={`${__POSTS_SERVICE_URL__}`}/>
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
        component: Resume,
        exact: true,
        path: "/resume"
    },
    {
        component: Letter,
        exact: true,
        path: "/letter"
    },
    {
        component: Error,
        path: "*"
    }
];

export default routes;
