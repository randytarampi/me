const {expect} = require("chai");
const {fromJS} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const sinon = require("sinon");
const {SET_GOOGLE_MAP_CENTER, setGoogleMapCenterCreator} = require("../../../../../../../src/lib/actions/map/index.js");

describe("setGoogleMapCenter", function () {
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
        const stubGoogleMapTilt = "meow";
        const stubGoogleMapPanTo = sinon.stub().returns(stubGoogleMapTilt);
        const stubGetGoogleMap = () => {
            return {
                panTo: stubGoogleMapPanTo
            };
        };
        const stubNewCenter = {
            lat: 1,
            lng: 1
        };

        stubStore.dispatch(setGoogleMapCenterCreator(stubGetGoogleMap, stubMapId, stubNewCenter));

        const actions = stubStore.getActions();

        expect(actions).to.eql([
            {
                type: SET_GOOGLE_MAP_CENTER,
                payload: {
                    id: stubMapId,
                    center: stubNewCenter
                }
            }
        ]);
        expect(stubGoogleMapPanTo.calledOnce).to.eql(true);
    });

    it("is dispatched with the expected payload (no map)", function () {
        const stubMapId = "woof";
        const stubGetGoogleMap = () => {
            return null;
        };
        const stubNewCenter = {
            lat: 1,
            lng: 1
        };

        stubStore.dispatch(setGoogleMapCenterCreator(stubGetGoogleMap, stubMapId, stubNewCenter));

        const actions = stubStore.getActions();

        expect(actions).to.have.length(0);
    });
});
