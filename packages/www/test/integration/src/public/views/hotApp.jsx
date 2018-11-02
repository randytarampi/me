import {LoadingSpinner} from "@randy.tarampi/jsx";
import {mount} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "../../../../../src/public/views/hotApp";

describe("hotApp", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = undefined;
        stubStore = mockStore(stubInitialState);
    });

    it("renders (while rehydrating)", function () {
        const rendered = mount(stubStore)(<App/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(LoadingSpinner);
    });

    it("renders (rehydrated)", function () {
        const rendered = mount(stubStore)(<App/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(LoadingSpinner);

        const loaded = rendered.setState({
            ...rendered.state(),
            rehydrated: true
        });
        expect(loaded).to.be.ok;
        expect(loaded).to.have.descendants(Provider);
    });
});
