const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const setErrorTimeoutHandler = require("../../../../../../src/lib/actions/error/setErrorTimeoutHandler.js").default || require("../../../../../../src/lib/actions/error/setErrorTimeoutHandler.js");
const {SET_ERROR_TIMEOUT_HANDLER} = require("../../../../../../src/lib/actions/error/setErrorTimeoutHandler.js");

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
