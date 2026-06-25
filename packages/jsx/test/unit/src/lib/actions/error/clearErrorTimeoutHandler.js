const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const clearErrorTimeoutHandler = require("../../../../../../src/lib/actions/error/clearErrorTimeoutHandler.js").default || require("../../../../../../src/lib/actions/error/clearErrorTimeoutHandler.js");
const {CLEAR_ERROR_TIMEOUT_HANDLER} = require("../../../../../../src/lib/actions/error/clearErrorTimeoutHandler.js");

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

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CLEAR_ERROR_TIMEOUT_HANDLER}]);
        });
    });
});
