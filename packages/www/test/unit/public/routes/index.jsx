import {ConnectedPosts} from "@randy.tarampi/jsx";
import {shallow} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import {Redirect} from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {BlogRouteHandler, PhotosRouteHandler, WordsRouteHandler} from "../../../../src/public/routes";

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
                <Redirect to="/blog"/>
            );
        });
    });

    describe("PhotosRouteHandler", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<PhotosRouteHandler/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.contain(
                <Redirect to="/blog"/>
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
});

