import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import * as instantiateMap from "../../../../../../../src/lib/actions/map/google/instantiateMap";
import * as onBoundsChanged from "../../../../../../../src/lib/actions/map/google/onBoundsChanged";
import * as onHeadingChanged from "../../../../../../../src/lib/actions/map/google/onHeadingChanged";
import * as onIdle from "../../../../../../../src/lib/actions/map/google/onIdle";
import * as onMapTypeIdChanged from "../../../../../../../src/lib/actions/map/google/onMapTypeIdChanged";
import * as onTiltChanged from "../../../../../../../src/lib/actions/map/google/onTiltChanged";
import * as onZoomChanged from "../../../../../../../src/lib/actions/map/google/onZoomChanged";
import {ConnectedGoogleMap} from "../../../../../../../src/lib/containers/map/google";
import {shallow} from "../../../../../../../src/test/util";

describe("ConnectedGoogleMap", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        sinon.stub(instantiateMap, "instantiateGoogleMapCreator").returns(() => Promise.resolve());
        sinon.stub(onBoundsChanged, "onGoogleMapBoundsChangedCreator").returns(() => Promise.resolve());
        sinon.stub(onHeadingChanged, "onGoogleMapHeadingChangedCreator").returns(() => Promise.resolve());
        sinon.stub(onIdle, "onGoogleMapIdleCreator").returns(() => Promise.resolve());
        sinon.stub(onMapTypeIdChanged, "onGoogleMapMapTypeIdChangedCreator").returns(() => Promise.resolve());
        sinon.stub(onTiltChanged, "onGoogleMapTiltChangedCreator").returns(() => Promise.resolve());
        sinon.stub(onZoomChanged, "onGoogleMapZoomChangedCreator").returns(() => Promise.resolve());
    });

    afterEach(function () {
        instantiateMap.instantiateGoogleMapCreator.restore();
        onBoundsChanged.onGoogleMapBoundsChangedCreator.restore();
        onHeadingChanged.onGoogleMapHeadingChangedCreator.restore();
        onIdle.onGoogleMapIdleCreator.restore();
        onMapTypeIdChanged.onGoogleMapMapTypeIdChangedCreator.restore();
        onTiltChanged.onGoogleMapTiltChangedCreator.restore();
        onZoomChanged.onGoogleMapZoomChangedCreator.restore();
    });

    it("receives default props", function () {
        const stubProps = {id: "woof"};
        const rendered = shallow(stubStore)(<ConnectedGoogleMap {...stubProps} />);

        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("instantiateMap");
        expect(rendered).to.have.prop("onBoundsChanged");
        expect(rendered).to.have.prop("onHeadingChanged");
        expect(rendered).to.have.prop("onIdle");
        expect(rendered).to.have.prop("onMapTypeIdChanged");
        expect(rendered).to.have.prop("onTiltChanged");
        expect(rendered).to.have.prop("onZoomChanged");
    });

    it("dispatches `passedAndMappedMapActionCreators` and `defaultMapActionCreators` properly", function () {
        const stubProps = {
            id: "woof",
            onIdle: sinon.stub().returns(() => Promise.resolve())
        };
        const rendered = shallow(stubStore)(<ConnectedGoogleMap {...stubProps} />);

        expect(rendered).to.have.prop("onIdle");

        return rendered.prop("onIdle")("woof")
            .then(() => {
                expect(onIdle.onGoogleMapIdleCreator.calledOnce).to.eql(true);
                expect(stubProps.onIdle.calledOnce).to.eql(true);
                sinon.assert.calledWith(stubProps.onIdle, "woof");
            });
    });
});
