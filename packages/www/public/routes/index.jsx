import {ConnectedError, ConnectedPosts} from "@randy.tarampi/jsx";
import {ConnectedLetter} from "@randy.tarampi/letter";
import {ConnectedResume} from "@randy.tarampi/resume";
import pathToRegExp from "path-to-regexp";
import React, {Fragment} from "react";
import {Tab} from "react-materialize";
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

    return route; // FIXME-RT: This would really be a lot better if it returned some kind of `Route` record instead of a plain object, that way I could properly revive the `pathRegExp` when `redux-offline` revives my local state.
};

const routes = [
    {
        component: Main,
        exact: true,
        path: "/",
        tab: <Tab title={ // FIXME-RT: Ideally these `Tab`s wouldn't be instantiated, but stateless components. Can't do that because of how `react-materialize` and `$` interact to manage the selection state internally. Maybe this goes away with `react-materialize^3` and `materialize^1`?
            <Fragment>
                <i className="far fa-hand-paper"></i>
                <span className="hide-on-med-and-down">&nbsp;|&nbsp;Hey!</span>
            </Fragment>
        }></Tab>
    },
    {
        component: BlogRouteHandler,
        exact: true,
        path: "/blog",
        tab: <Tab title={
            <Fragment>
                <i className="fas fa-comment-alt"></i>
                <span className="hide-on-med-and-down">&nbsp;|&nbsp;Blog</span>
            </Fragment>
        }/>
    },
    {
        component: ConnectedLetter,
        path: "/letter/:variant?",
        tab: <Tab title={
            <Fragment>
                <i className="fas fa-file-signature"></i>
                <span className="hide-on-med-and-down">&nbsp;|&nbsp;Hire me</span>
            </Fragment>
        }/>
    },
    {
        component: ConnectedResume,
        path: "/resume/:variant?",
        tab: <Tab title={
            <Fragment>
                <i className="fas fa-portrait"></i>
                <span className="hide-on-med-and-down">&nbsp;|&nbsp;About me</span>
            </Fragment>
        }/>
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
