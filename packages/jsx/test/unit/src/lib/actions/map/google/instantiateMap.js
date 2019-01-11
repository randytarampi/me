import {expect} from "chai";
import {fromJS} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {INSTANTIATE_GOOGLE_MAP, instantiateGoogleMapCreator} from "../../../../../../../src/lib/actions/map";

describe("instantiateGoogleMap", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        stubInitialState = fromJS({maps: {}});
        mockStore = configureStore(stubMiddleware);
        stubStore = mockStore(stubInitialState);
    });

    it("is dispatched with the expected payload (no initial state)", function () {
        const stubMapId = "woof";
        const stubGoogleMapPanToBounds = sinon.stub();
        const stubGetGoogleMap = () => {
            return {
                panToBounds: stubGoogleMapPanToBounds
            };
        };

        stubStore.dispatch(instantiateGoogleMapCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(1);
        expect(actions).to.eql([{
            type: INSTANTIATE_GOOGLE_MAP,
            payload: {
                id: stubMapId,
                vendor: "google"
            }
        }]);
        expect(stubGoogleMapPanToBounds.notCalled).to.eql(true);
    });

    it("is dispatched with the expected payload (existing state & panToBounds)", function () {
        const stubMapId = "woof";
        const stubGoogleMapPanToBounds = sinon.stub();
        const stubGoogleMapPanTo = sinon.stub();
        const stubGoogleMapSetZoom = sinon.stub();
        const stubGetGoogleMap = () => {
            return {
                panTo: stubGoogleMapPanTo,
                panToBounds: stubGoogleMapPanToBounds,
                setZoom: stubGoogleMapSetZoom,
            };
        };
        const stubInitialStateMapBounds = {
            north: 0,
            east: 0,
            south: 0,
            west: 0
        };

        stubInitialState = stubInitialState.setIn(["maps", stubMapId], fromJS({
            id: stubMapId,
            bounds: stubInitialStateMapBounds
        }));
        stubStore = mockStore(stubInitialState);

        stubStore.dispatch(instantiateGoogleMapCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(1);
        expect(actions).to.eql([{
            type: INSTANTIATE_GOOGLE_MAP,
            payload: {
                id: stubMapId,
                vendor: "google",
                bounds: stubInitialStateMapBounds
            }
        }]);
        expect(stubGoogleMapPanTo.notCalled).to.eql(true);
        expect(stubGoogleMapPanToBounds.calledOnce).to.eql(true);
        expect(stubGoogleMapSetZoom.notCalled).to.eql(true);
        sinon.assert.calledWith(stubGoogleMapPanToBounds, stubInitialStateMapBounds);
    });

    it("is dispatched with the expected payload (existing state & panTo)", function () {
        const stubMapId = "woof";
        const stubGoogleMapPanToBounds = sinon.stub();
        const stubGoogleMapPanTo = sinon.stub();
        const stubGoogleMapSetZoom = sinon.stub();
        const stubGetGoogleMap = () => {
            return {
                panTo: stubGoogleMapPanTo,
                panToBounds: stubGoogleMapPanToBounds,
                setZoom: stubGoogleMapSetZoom,
            };
        };
        const stubInitialStateMapCenter = {
            lat: 0,
            lng: 0
        };

        stubInitialState = stubInitialState.setIn(["maps", stubMapId], fromJS({
            id: stubMapId,
            center: stubInitialStateMapCenter
        }));
        stubStore = mockStore(stubInitialState);

        stubStore.dispatch(instantiateGoogleMapCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(1);
        expect(actions).to.eql([{
            type: INSTANTIATE_GOOGLE_MAP,
            payload: {
                id: stubMapId,
                vendor: "google",
                center: stubInitialStateMapCenter
            }
        }]);
        expect(stubGoogleMapPanTo.calledOnce).to.eql(true);
        expect(stubGoogleMapPanToBounds.notCalled).to.eql(true);
        expect(stubGoogleMapSetZoom.notCalled).to.eql(true);
        sinon.assert.calledWith(stubGoogleMapPanTo, stubInitialStateMapCenter);
    });

    it("is dispatched with the expected payload (existing state & panTo & setZoom)", function () {
        const stubMapId = "woof";
        const stubGoogleMapPanToBounds = sinon.stub();
        const stubGoogleMapPanTo = sinon.stub();
        const stubGoogleMapSetZoom = sinon.stub();
        const stubGoogleMapZoom = 12;
        const stubGetGoogleMap = () => {
            return {
                panTo: stubGoogleMapPanTo,
                panToBounds: stubGoogleMapPanToBounds,
                setZoom: stubGoogleMapSetZoom,
            };
        };
        const stubInitialStateMapCenter = {
            lat: 0,
            lng: 0
        };

        stubInitialState = stubInitialState.setIn(["maps", stubMapId], fromJS({
            id: stubMapId,
            center: stubInitialStateMapCenter,
            zoom: stubGoogleMapZoom
        }));
        stubStore = mockStore(stubInitialState);

        stubStore.dispatch(instantiateGoogleMapCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(1);
        expect(actions).to.eql([{
            type: INSTANTIATE_GOOGLE_MAP,
            payload: {
                id: stubMapId,
                vendor: "google",
                center: stubInitialStateMapCenter,
                zoom: stubGoogleMapZoom
            }
        }]);
        expect(stubGoogleMapPanTo.calledOnce).to.eql(true);
        expect(stubGoogleMapPanToBounds.notCalled).to.eql(true);
        expect(stubGoogleMapSetZoom.calledOnce).to.eql(true);
        sinon.assert.calledWith(stubGoogleMapPanTo, stubInitialStateMapCenter);
        sinon.assert.calledWith(stubGoogleMapSetZoom, stubGoogleMapZoom);
    });
});
