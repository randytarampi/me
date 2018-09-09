import React from "react";
import {expect} from "chai";
import {logger} from "@randy.tarampi/jsx";
import Bears from "../../../../../public/views/main/bears";
import Intro from "../../../../../public/views/main/intro";
import Works from "../../../../../public/views/main/works";
import Main from "../../../../../public/views/main";
import {shallow} from "@randy.tarampi/jsx/test/util";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {Map} from "immutable";
import sinon from "sinon";

describe("Main", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        sinon.stub(logger, "info").returns();
    });

    afterEach(function () {
        logger.info.restore();
    });

    it("renders", function () {
        const rendered = shallow(stubStore)(<Main/>);

        expect(rendered).to.be.ok;
        expect(rendered.find(Intro)).to.be.ok;
        expect(rendered.find(Intro).length).to.eql(1);
        expect(rendered.find(Bears)).to.be.ok;
        expect(rendered.find(Bears).length).to.eql(1);
        expect(rendered.find(Works)).to.be.ok;
        expect(rendered.find(Works).length).to.eql(1);

        expect(logger.info.calledOnce).to.eql(true);
        sinon.assert.calledWith(logger.info, `My blog is a lot more fun (content and code wise), so check that out:\n\t\t${window.location.origin}${__POSTS_APP_URL__}`);
    });
});
