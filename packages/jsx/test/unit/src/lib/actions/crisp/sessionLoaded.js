import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sessionLoaded, {CRISP_SESSION_LOADED} from "../../../../../../src/lib/actions/crisp/sessionLoaded";

describe("sessionLoaded", function () {
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

    describe("CRISP_SESSION_LOADED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(sessionLoaded(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_SESSION_LOADED, payload: stubPayload}]);
        });
    });
});
