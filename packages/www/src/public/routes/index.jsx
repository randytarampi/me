import {HelloBear, Photo, Post} from "@randy.tarampi/js";
import {ConnectedError, ConnectedPosts} from "@randy.tarampi/jsx";
import {ConnectedLetter} from "@randy.tarampi/letter";
import {ConnectedResume} from "@randy.tarampi/resume";
import React, {Fragment} from "react";
import Helmet from "react-helmet";
import {Tab} from "react-materialize";
import {Redirect} from "react-router";
import Main from "../views/main";

const helloBear = new HelloBear();

export const PhotosRouteHandler = props => <Redirect {...props} to="/blog/photos"/>;
export const WordsRouteHandler = props => <Redirect {...props} to="/blog/words"/>;
export const BlogRouteHandler = props => <Fragment>
    <Helmet>
        <title>{__ME_PERSON_NAME__} — Blog</title>
    </Helmet>
    <ConnectedPosts fetchUrl={`${__POSTS_SERVICE_URL__}`} {...props} />
</Fragment>;
export const BlogWordsRouteHandler = props => <Fragment>
    <Helmet>
        <title>{__ME_PERSON_NAME__} — Words</title>
    </Helmet>
    <BlogRouteHandler fetchUrl={`${__POSTS_SERVICE_URL__}`} type={Post.type} {...props} />
</Fragment>;
export const BlogPhotoRouteHandler = props => <Fragment>
    <Helmet>
        <title>{__ME_PERSON_NAME__} — Photos</title>
    </Helmet>
    <BlogRouteHandler fetchUrl={`${__POSTS_SERVICE_URL__}`} type={Photo.type} {...props} />
</Fragment>;
export const LetterHandler = props => <Fragment>
    <Helmet>
        <title>{__ME_PERSON_NAME__} — Hire me</title>
    </Helmet>
    <ConnectedLetter {...props}/>
</Fragment>;
export const ResumeHandler = props => <Fragment>
    <Helmet>
        <title>{__ME_PERSON_NAME__} — About me</title>
    </Helmet>
    <ConnectedResume {...props}/>
</Fragment>;
export const MainHandler = props => <Fragment>
    <Helmet>
        <title>{__ME_PERSON_NAME__} — {helloBear.toString()}</title>
    </Helmet>
    <Main {...props}/>
</Fragment>;

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
        component: MainHandler,
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
                component: BlogWordsRouteHandler,
                exact: true,
                path: "/blog/words"
            },
            {
                component: BlogPhotoRouteHandler,
                exact: true,
                path: "/blog/photos/:filter(tags)/:filterValue"
            },
            {
                component: BlogWordsRouteHandler,
                exact: true,
                path: "/blog/words/:filter(tags)/:filterValue"
            },
            {
                component: BlogRouteHandler,
                path: "/blog/:filter(tags)/:filterValue"
            }
        ]
    },
    {
        component: LetterHandler,
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
                component: LetterHandler,
                path: "/letter/:variant"
            }
        ]
    },
    {
        component: ResumeHandler,
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
                component: ResumeHandler,
                path: "/resume/:variant"
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
