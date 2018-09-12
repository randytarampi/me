import {ConnectedPosts} from "@randy.tarampi/jsx";
import {shallow} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {BlogRouteHandler, PhotosRouteHandler, WordsRouteHandler} from "../../../../public/routes";

describe("Intro", function () {
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
                <title>📝</title>
            );
            expect(rendered).to.contain(
                <ConnectedPosts fetchUrl={`${__WORDS_SERVICE_URL__}`}/>
            );
        });
    });

    describe("PhotosRouteHandler", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<PhotosRouteHandler/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.contain(
                <title>📸</title>
            );
            expect(rendered).to.contain(
                <ConnectedPosts fetchUrl={`${__PHOTOS_SERVICE_URL__}`}/>
            );
        });
    });

    describe("BlogRouteHandler", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<BlogRouteHandler/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.contain(
                <title>📸📝</title>
            );
            expect(rendered).to.contain(
                <ConnectedPosts fetchUrl={`${__POSTS_SERVICE_URL__}`}/>
            );
        });
    });
});

