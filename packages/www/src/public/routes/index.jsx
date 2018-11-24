import {ConnectedError, ConnectedPosts} from "@randy.tarampi/jsx";
import {ConnectedLetter} from "@randy.tarampi/letter";
import {ConnectedResume} from "@randy.tarampi/resume";
import React, {Fragment} from "react";
import {Tab} from "react-materialize";
import {Redirect} from "react-router";
import Main from "../views/main";

export const PhotosRouteHandler = props => <Redirect {...props} to="/blog/photos"/>;
export const WordsRouteHandler = props => <Redirect {...props} to="/blog/words"/>;
export const BlogRouteHandler = props => <ConnectedPosts fetchUrl={`${__POSTS_SERVICE_URL__}`} {...props} />;
export const BlogPostRouteHandler = props => <BlogRouteHandler fetchUrl={`${__POSTS_SERVICE_URL__}`} type="Post" {...props} />;
export const BlogPhotoRouteHandler = props => <BlogRouteHandler fetchUrl={`${__POSTS_SERVICE_URL__}`} type="Photo" {...props} />;

const augmentWithParent = (parent = null) => ({routes, ...route}) => {
    if (parent) {
        route.parent = {
            path: parent.path,
            tab: !!parent.tab,
            parent: parent.parent
        };
    }

    if (routes) {
        route.routes = routes.map(augmentWithParent(route));
    }

    return route;
};

const routes = [
    {
        component: Main,
        exact: true,
        path: "/",
        tab: <Tab
            key="/"
            title={ // FIXME-RT: Ideally these `Tab`s wouldn't be instantiated, but stateless components. Can't do that because of how `react-materialize` and `$` interact to manage the selection state internally. Maybe this goes away with `react-materialize^3` and `materialize^1`?
                <Fragment>
                    <i className="far fa-hand-paper"></i>
                    <span className="hide-on-med-and-down">&nbsp;|&nbsp;Hey!</span>
                </Fragment>
            }
        />
    },
    {
        component: BlogRouteHandler,
        path: "/blog",
        tab: <Tab
            key="/blog"
            title={
                <Fragment>
                    <i className="fas fa-comment-alt"></i>
                    <span className="hide-on-med-and-down">&nbsp;|&nbsp;Blog</span>
                </Fragment>
            }
        />,
        routes: [
            {
                component: BlogPhotoRouteHandler,
                exact: true,
                path: "/blog/photos"
            },
            {
                component: BlogPostRouteHandler,
                exact: true,
                path: "/blog/words"
            },
            {
                component: BlogRouteHandler,
                path: "/blog/:filter"
            },
            {
                component: BlogRouteHandler,
                path: "/blog/:filter/:filterValue",
            }
        ]
    },
    {
        component: ConnectedLetter,
        path: "/letter",
        tab: <Tab
            key="/letter"
            title={
                <Fragment>
                    <i className="fas fa-file-signature"></i>
                    <span className="hide-on-med-and-down">&nbsp;|&nbsp;Hire me</span>
                </Fragment>
            }
        />,
        routes: [
            {
                component: ConnectedLetter,
                path: "/letter/:variant",
            }
        ]
    },
    {
        component: ConnectedResume,
        path: "/resume",
        tab: <Tab
            key="/resume"
            title={
                <Fragment>
                    <i className="fas fa-portrait"></i>
                    <span className="hide-on-med-and-down">&nbsp;|&nbsp;About me</span>
                </Fragment>
            }
        />,
        routes: [
            {
                component: ConnectedResume,
                path: "/resume/:variant",
            }
        ]
    },

    // NOTE-RT: We need to render these redirect in `ReduxRouterRoot` for them to work so these need to be pulled out
    {
        component: PhotosRouteHandler,
        path: "/photos"
    },
    {
        component: WordsRouteHandler,
        path: "/words"
    },
    {
        component: ConnectedError
    }
].map(augmentWithParent());

export default routes;
