import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import websiteAvailabilityChanged, {CRISP_WEBSITE_AVAILABILITY_CHANGED} from "../../../../../../src/lib/actions/crisp/websiteAvailabilityChanged";

describe("websiteAvailabilityChanged", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubPayload;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
        stubPayload = "foo";
    });

    describe("CRISP_WEBSITE_AVAILABILITY_CHANGED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(websiteAvailabilityChanged(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_WEBSITE_AVAILABILITY_CHANGED, payload: stubPayload}]);
        });
    });
});
