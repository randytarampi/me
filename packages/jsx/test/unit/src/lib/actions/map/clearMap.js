const {expect} = require("chai");
const {fromJS} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const {CLEAR_MAP, clearMapCreator} = require("../../../../../../src/lib/actions/map/index.js");

describe("clearMap", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        stubInitialState = fromJS({
            maps: {}
        });
        mockStore = configureStore(stubMiddleware);
        stubStore = mockStore(stubInitialState);
    });

    it("is dispatched with the expected payload", function () {
        const stubMapId = "woof";
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

        stubStore.dispatch(clearMapCreator(stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(1);
        expect(actions).to.eql([{
            type: CLEAR_MAP,
            payload: {
                id: stubMapId
            }
        }]);
    });

    it("is dispatched with the expected payload", function () {
        const stubMapId = "woof";
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

        stubStore.dispatch(clearMapCreator(stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(1);
        expect(actions).to.eql([{
            type: CLEAR_MAP,
            payload: {
                id: stubMapId
            }
        }]);
    });
});
