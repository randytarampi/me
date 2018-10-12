import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import clearErrorTimeoutHandler, {CLEAR_ERROR_TIMEOUT_HANDLER} from "../../../../src/lib/actions/clearErrorTimeoutHandler";

describe("clearErrorTimeoutHandler", function () {
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

    describe("CLEAR_ERROR_TIMEOUT_HANDLER", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(clearErrorTimeoutHandler());

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CLEAR_ERROR_TIMEOUT_HANDLER}]);
        });
    });
});
