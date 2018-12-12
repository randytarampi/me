import {ConnectedHelloBear, RowBlock} from "@randy.tarampi/jsx";
import {shallow} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Intro, {IntroText} from "../../../../../src/public/views/main/intro";

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

    it("renders", function () {
        const rendered = shallow(stubStore)(<Intro/>);

        expect(rendered.find(IntroText)).to.have.length(2);
        expect(rendered).to.contain(
            <ConnectedHelloBear id="intro-hello-bear" htmlId="intro-large-hello-bear"/>
        );
        expect(rendered).to.contain(
            <ConnectedHelloBear id="intro-hello-bear" htmlId="intro-responsive-hello-bear"/>
        );
        expect(rendered.find(RowBlock)).to.have.length(3);
    });

    describe("IntroText", function () {
        it("renders", function () {
            const rendered = shallow(stubStore)(<IntroText/>);

            expect(rendered).to.contain(
                <h2>
                    <span className="text">Hey!</span>
                </h2>
            );
        });
    });
});
