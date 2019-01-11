import {expect} from "chai";
import {fromJS} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {
    HANDLE_GOOGLE_MAP_ZOOM_CHANGED,
    onGoogleMapZoomChangedCreator,
    UPDATE_MAP
} from "../../../../../../../src/lib/actions/map";

describe("onGoogleMapZoomChanged", function () {
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
        const stubGoogleMapZoom = "meow";
        const stubGoogleMapGetZoom = sinon.stub().returns(stubGoogleMapZoom);
        const stubGetGoogleMap = () => {
            return {
                getZoom: stubGoogleMapGetZoom
            };
        };

        stubStore.dispatch(onGoogleMapZoomChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: HANDLE_GOOGLE_MAP_ZOOM_CHANGED,
                payload: {
                    id: stubMapId,
                    zoom: stubGoogleMapZoom
                }
            },
            {
                type: UPDATE_MAP,
                payload: {
                    id: stubMapId,
                    zoom: stubGoogleMapZoom
                }
            }
        ]);
        expect(stubGoogleMapGetZoom.calledOnce).to.eql(true);
    });

    it("is dispatched with the expected payload (existing state)", function () {
        const stubMapId = "woof";
        const stubGoogleMapZoom = "meow";
        const stubGoogleMapGetZoom = sinon.stub().returns(stubGoogleMapZoom);
        const stubGetGoogleMap = () => {
            return {
                getZoom: stubGoogleMapGetZoom
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

        stubStore.dispatch(onGoogleMapZoomChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: HANDLE_GOOGLE_MAP_ZOOM_CHANGED,
                payload: {
                    id: stubMapId,
                    zoom: stubGoogleMapZoom
                }
            },
            {
                type: UPDATE_MAP,
                payload: {
                    id: stubMapId,
                    zoom: stubGoogleMapZoom
                }
            }
        ]);
        expect(stubGoogleMapGetZoom.calledOnce).to.eql(true);
    });

    it("is dispatched with the expected payload (no map)", function () {
        const stubMapId = "woof";
        const stubGetGoogleMap = () => {
            return null;
        };

        stubStore.dispatch(onGoogleMapZoomChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(0);
    });
});
