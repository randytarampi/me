import {expect} from "chai";
import {fromJS} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {
    HANDLE_GOOGLE_MAP_BOUNDS_CHANGED,
    onGoogleMapBoundsChangedCreator,
    UPDATE_MAP
} from "../../../../../../../src/lib/actions/map";

describe("onGoogleMapBoundsChanged", function () {
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
        const stubBounds = "meow";
        const stubCenter = "grr";
        const stubSouthWest = "rawr";
        const stubNorthEast = "arf";
        const stubGoogleMapBounds = {
            toJSON: () => stubBounds,
            getCenter: sinon.stub().returns({toJSON: () => stubCenter}),
            getSouthWest: sinon.stub().returns({toJSON: () => stubSouthWest}),
            getNorthEast: sinon.stub().returns({toJSON: () => stubNorthEast})
        };
        const stubGoogleMapGetBounds = sinon.stub().returns(stubGoogleMapBounds);
        const stubGetGoogleMap = () => {
            return {
                getBounds: stubGoogleMapGetBounds
            };
        };

        stubStore.dispatch(onGoogleMapBoundsChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: HANDLE_GOOGLE_MAP_BOUNDS_CHANGED,
                payload: {
                    id: stubMapId,
                    bounds: stubBounds,
                    center: stubCenter,
                    sw: stubSouthWest,
                    ne: stubNorthEast
                }
            },
            {
                type: UPDATE_MAP,
                payload: {
                    id: stubMapId,
                    bounds: stubBounds,
                    center: stubCenter,
                    sw: stubSouthWest,
                    ne: stubNorthEast
                }
            }
        ]);
        expect(stubGoogleMapGetBounds.calledOnce).to.eql(true);
    });

    it("is dispatched with the expected payload (existing state)", function () {
        const stubMapId = "woof";
        const stubBounds = "meow";
        const stubCenter = "grr";
        const stubSouthWest = "rawr";
        const stubNorthEast = "arf";
        const stubGoogleMapBounds = {
            toJSON: () => stubBounds,
            getCenter: sinon.stub().returns({toJSON: () => stubCenter}),
            getSouthWest: sinon.stub().returns({toJSON: () => stubSouthWest}),
            getNorthEast: sinon.stub().returns({toJSON: () => stubNorthEast})
        };
        const stubGoogleMapGetBounds = sinon.stub().returns(stubGoogleMapBounds);
        const stubGetGoogleMap = () => {
            return {
                getBounds: stubGoogleMapGetBounds
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

        stubStore.dispatch(onGoogleMapBoundsChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: HANDLE_GOOGLE_MAP_BOUNDS_CHANGED,
                payload: {
                    id: stubMapId,
                    bounds: stubBounds,
                    center: stubCenter,
                    sw: stubSouthWest,
                    ne: stubNorthEast
                }
            },
            {
                type: UPDATE_MAP,
                payload: {
                    id: stubMapId,
                    bounds: stubBounds,
                    center: stubCenter,
                    sw: stubSouthWest,
                    ne: stubNorthEast
                }
            }
        ]);
        expect(stubGoogleMapGetBounds.calledOnce).to.eql(true);
    });

    it("is dispatched with the expected payload (no map)", function () {
        const stubMapId = "woof";
        const stubGetGoogleMap = () => {
            return null;
        };

        stubStore.dispatch(onGoogleMapBoundsChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(0);
    });
});
