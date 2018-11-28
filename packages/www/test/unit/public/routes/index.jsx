import {Photo, Post} from "@randy.tarampi/js";
import {ConnectedPosts} from "@randy.tarampi/jsx";
import {shallow} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import {Redirect} from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    BlogPhotoRouteHandler,
    BlogRouteHandler,
    BlogWordsRouteHandler,
    PhotosRouteHandler,
    WordsRouteHandler
} from "../../../../src/public/routes";

describe("routes", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
    });

    describe("WordsRouteHandler", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<WordsRouteHandler/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.contain(
                <Redirect to="/blog/words"/>
            );
        });
    });

    describe("PhotosRouteHandler", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<PhotosRouteHandler/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.contain(
                <Redirect to="/blog/photos"/>
            );
        });
    });

    describe("BlogRouteHandler", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<BlogRouteHandler/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.contain(
                <ConnectedPosts fetchUrl={`${__POSTS_SERVICE_URL__}`}/>
            );
        });
    });

    describe("BlogPhotoRouteHandler", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<BlogPhotoRouteHandler/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.contain(
                <BlogRouteHandler fetchUrl={`${__POSTS_SERVICE_URL__}`} type={Photo.name}/>
            );
        });
    });

    describe("BlogWordsRouteHandler", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<BlogWordsRouteHandler/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.contain(
                <BlogRouteHandler fetchUrl={`${__POSTS_SERVICE_URL__}`} type={Post.name}/>
            );
        });
    });
});

