import React from "react";
import {expect} from "chai";
import {DoubtBear} from "@randy.tarampi/js";
import {Bear, RowBlock} from "@randy.tarampi/jsx";
import Works from "../../../../../public/views/main/works";
import {shallow} from "@randy.tarampi/jsx/test/util";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Map} from "immutable";

describe("Works", function () {
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
        const rendered = shallow(stubStore)(<Works/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.contain(
            <h2>
                <span className="text">Still reading eh?</span>
            </h2>
        );
        expect(rendered).to.contain(
            <Bear emoji={DoubtBear.fromJS()} id="code-bear"/>
        );
        expect(rendered.find(RowBlock)).to.have.length(1);
    });
});
