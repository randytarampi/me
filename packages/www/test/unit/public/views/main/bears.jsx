import React from "react";
import {expect} from "chai";
import {Bear, RowBlock} from "@randy.tarampi/jsx";
import Bears from "../../../../../public/views/main/bears";
import {shallow} from "@randy.tarampi/jsx/test/util";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Map} from "immutable";

describe("Bears", function () {
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
        const rendered = shallow(stubStore)(<Bears/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.contain(
            <h2>
                <span className="text">And the Bears?</span>
            </h2>
        );
        expect(rendered).to.contain(
            <Bear id="bears-bear"/>
        );
        expect(rendered.find(RowBlock)).to.have.length(1);
    });
});
