import {BlogRouteHandler, PhotosRouteHandler, WordsRouteHandler} from "../../../../public/routes";
import React from "react";
import {expect} from "chai";
import {Posts} from "@randy.tarampi/jsx";
import {shallow} from "@randy.tarampi/jsx/test/util";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Map} from "immutable";

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
                <Posts fetchUrl={`${__WORDS_SERVICE_URL__}`}/>
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
                <Posts fetchUrl={`${__PHOTOS_SERVICE_URL__}`}/>
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
                <Posts fetchUrl={`${__POSTS_SERVICE_URL__}`}/>
            );
        });
    });
});

