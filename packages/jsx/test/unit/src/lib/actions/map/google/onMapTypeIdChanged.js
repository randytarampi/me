import {expect} from "chai";
import {fromJS} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {
    HANDLE_GOOGLE_MAP_TYPE_CHANGED,
    onGoogleMapMapTypeIdChangedCreator,
    UPDATE_MAP
} from "../../../../../../../src/lib/actions/map";

describe("onGoogleMapMapTypeIdChanged", function () {
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
        const stubGoogleMapMapTypeId = "meow";
        const stubGoogleMapGetMapTypeId = sinon.stub().returns(stubGoogleMapMapTypeId);
        const stubGetGoogleMap = () => {
            return {
                getMapTypeId: stubGoogleMapGetMapTypeId
            };
        };

        stubStore.dispatch(onGoogleMapMapTypeIdChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: HANDLE_GOOGLE_MAP_TYPE_CHANGED,
                payload: {
                    id: stubMapId,
                    type: stubGoogleMapMapTypeId
                }
            },
            {
                type: UPDATE_MAP,
                payload: {
                    id: stubMapId,
                    type: stubGoogleMapMapTypeId
                }
            }
        ]);
        expect(stubGoogleMapGetMapTypeId.calledOnce).to.eql(true);
    });

    it("is dispatched with the expected payload (existing state)", function () {
        const stubMapId = "woof";
        const stubGoogleMapMapTypeId = "meow";
        const stubGoogleMapGetMapTypeId = sinon.stub().returns(stubGoogleMapMapTypeId);
        const stubGetGoogleMap = () => {
            return {
                getMapTypeId: stubGoogleMapGetMapTypeId
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

        stubStore.dispatch(onGoogleMapMapTypeIdChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: HANDLE_GOOGLE_MAP_TYPE_CHANGED,
                payload: {
                    id: stubMapId,
                    type: stubGoogleMapMapTypeId
                }
            },
            {
                type: UPDATE_MAP,
                payload: {
                    id: stubMapId,
                    type: stubGoogleMapMapTypeId
                }
            }
        ]);
        expect(stubGoogleMapGetMapTypeId.calledOnce).to.eql(true);
    });

    it("is dispatched with the expected payload (no map)", function () {
        const stubMapId = "woof";
        const stubGetGoogleMap = () => {
            return null;
        };

        stubStore.dispatch(onGoogleMapMapTypeIdChangedCreator(stubGetGoogleMap, stubMapId));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(0);
    });
});
