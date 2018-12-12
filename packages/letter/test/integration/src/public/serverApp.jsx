import {mount} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "../../../../src/public/views/serverApp";

describe("serverApp", function () {
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

    it("renders", function () {
        const rendered = mount(stubStore)(<App/>);

        expect(rendered).to.have.descendants(Provider);
    });
});
