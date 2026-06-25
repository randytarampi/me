const {expect} = require("chai");
const {fromJS} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const {
    HANDLE_GOOGLE_MAP_IDLE,
    onGoogleMapIdleCreator
} = require("../../../../../../../src/lib/actions/map/index.js");

describe("onGoogleMapIdle", function () {
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
        const stubGetGoogleMap = () => {
            return {};
        };

        stubStore.dispatch(onGoogleMapIdleCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: HANDLE_GOOGLE_MAP_IDLE,
                payload: {
                    id: stubMapId
                }
            }
        ]);
    });

    it("is dispatched with the expected payload (existing state)", function () {
        const stubMapId = "woof";
        const stubGetGoogleMap = () => {
            return {};
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

        stubStore.dispatch(onGoogleMapIdleCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: HANDLE_GOOGLE_MAP_IDLE,
                payload: {
                    id: stubMapId
                }
            }
        ]);
    });

    it("is dispatched with the expected payload (no map)", function () {
        const stubMapId = "woof";
        const stubGetGoogleMap = () => {
            return null;
        };

        stubStore.dispatch(onGoogleMapIdleCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(0);
    });
});
