import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import setErrorTimeoutHandler, {SET_ERROR_TIMEOUT_HANDLER} from "../../../../../src/lib/actions/setErrorTimeoutHandler";

describe("setErrorTimeoutHandler", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
    });

    describe("SET_ERROR_TIMEOUT_HANDLER", function () {
        it("is dispatched with the expected payload", function () {
            const stubPayload = "woof";
            stubStore.dispatch(setErrorTimeoutHandler(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: SET_ERROR_TIMEOUT_HANDLER, payload: stubPayload}]);
        });
    });
});
