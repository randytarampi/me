import {LoadingSpinner} from "@randy.tarampi/jsx";
import {mount} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import React, {act} from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import {App} from "../../../../../src/public/views/hotApp";

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

        expect(rendered).to.have.descendants(LoadingSpinner);
    });

    it("renders (rehydrated)", function () {
        const rendered = mount(stubStore)(<App/>);

        expect(rendered).to.have.descendants(LoadingSpinner);

        // NOTE-RT: enzyme's `wrapper.setState()` no longer propagates to the root instance under React 19 + the
        // NOTE-RT: cfaester adapter, so drive the rehydration through the component instance inside `act(...)`.
        act(() => {
            rendered.instance().setState({rehydrated: true});
        });
        rendered.update();

        expect(rendered).to.have.descendants(Provider);
    });
});
