import {Posts} from "@randy.tarampi/jsx";
import Resume from "jsonresume-theme-randytarampi/public/components/resume";
import React, {Fragment} from "react";
import Helmet from "react-helmet";
import Main from "../views/main";

const Photos = () => <Fragment>
    <Helmet>
        <title>📸</title>
    </Helmet>
    <Posts fetchUrl={`${__PHOTOS_SERVICE_URL__}`}/>
</Fragment>;
const Words = () => <Fragment>
    <Helmet>
        <title>📝</title>
    </Helmet>
    <Posts fetchUrl={`${__WORDS_SERVICE_URL__}`}/>
</Fragment>;
const Blog = () => <Fragment>
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
        component: Photos,
        exact: true,
        path: "/photos"
    },
    {
        component: Words,
        exact: true,
        path: "/words"
    },
    {
        component: Blog,
        exact: true,
        path: "/blog"
    },
    {
        component: Resume,
        exact: true,
        path: "/resume"
    }
];

export default routes;
