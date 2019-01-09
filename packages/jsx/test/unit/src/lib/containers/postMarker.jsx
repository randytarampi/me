import {Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import * as setGoogleMapCenterAction from "../../../../../src/lib/actions/map/google/setMapCenter";
import * as setControlStateAction from "../../../../../src/lib/actions/ui/setControlState";
import {buildPostMarkerId} from "../../../../../src/lib/components";
import {ConnectedPostMarker} from "../../../../../src/lib/containers/postMarker";
import selectors from "../../../../../src/lib/data/selectors";
import {shallow} from "../../../../../src/test/util";

describe("ConnectedPostMarker", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubControlState;
    let stubPost;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
        stubControlState = Map();
        stubPost = Post.fromJS({id: "woof"});

        sinon.stub(selectors, "getControlStateForId").returns(stubControlState);
        sinon.stub(setControlStateAction, "setControlStateCreator").returns({type: "MEOW"});
        sinon.stub(setGoogleMapCenterAction, "setGoogleMapCenterCreator").returns({type: "MEOW"});
    });

    afterEach(function () {
        selectors.getControlStateForId.restore();
        setControlStateAction.setControlStateCreator.restore();
        setGoogleMapCenterAction.setGoogleMapCenterCreator.restore();
    });

    it("passes `isVisible` (no existing state)", function () {
        stubControlState = null;
        selectors.getControlStateForId.restore();
        sinon.stub(selectors, "getControlStateForId").returns(stubControlState);

        const stubProps = {post: stubPost};
        const rendered = shallow(stubStore)(<ConnectedPostMarker {...stubProps} />);

        expect(rendered).to.have.prop("isVisible", false);
    });

    it("passes `isVisible` (has existing state)", function () {
        stubControlState = Map({
            visible: "woof"
        });
        selectors.getControlStateForId.restore();
        sinon.stub(selectors, "getControlStateForId").returns(stubControlState);

        const stubProps = {post: stubPost};
        const rendered = shallow(stubStore)(<ConnectedPostMarker {...stubProps} />);

        expect(rendered).to.have.prop("isVisible", stubControlState.get("visible"));
    });

    it("dispatches `onVisibilityToggle` properly", function () {
        stubControlState = Map({
            visible: "woof"
        });

        selectors.getControlStateForId.restore();
        sinon.stub(selectors, "getControlStateForId").returns(stubControlState);

        const stubProps = {post: stubPost};
        const rendered = shallow(stubStore)(<ConnectedPostMarker {...stubProps} />);

        expect(rendered).to.have.prop("onVisibilityToggle");

        const stubShouldBeVisible = false;
        rendered.prop("onVisibilityToggle")(stubShouldBeVisible);
        sinon.assert.calledWith(setControlStateAction.setControlStateCreator, buildPostMarkerId(stubPost), {
            visible: !!stubShouldBeVisible
        });
    });

    it("dispatches `setMapCenter` properly", function () {
        const stubGetGoogleMap = sinon.stub();
        const stubProps = {post: stubPost, mapId: "woof", getGoogleMap: stubGetGoogleMap};
        const rendered = shallow(stubStore)(<ConnectedPostMarker {...stubProps} />);

        expect(rendered).to.have.prop("onVisibilityToggle");

        const stubNewCenter = "meow";
        rendered.prop("setMapCenter")(stubNewCenter);
        sinon.assert.calledWith(setGoogleMapCenterAction.setGoogleMapCenterCreator, stubProps.getGoogleMap, stubProps.mapId, stubNewCenter);
    });
});
