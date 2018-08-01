import {Posts} from "@randy.tarampi/jsx";
import Resume from "jsonresume-theme-randytarampi/public/components/resume";
import React from "react";
import Main from "../views/main";

const Photos = () => <Posts fetchUrl={`${__PHOTOS_SERVICE_URL__}`}/>;
const Words = () => <Posts fetchUrl={`${__WORDS_SERVICE_URL__}`}/>;
const Blog = () => <Posts fetchUrl={`${__POSTS_SERVICE_URL__}`}/>;

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
