const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const clearError = require("../../../../../../src/lib/actions/error/clearError.js").default || require("../../../../../../src/lib/actions/error/clearError.js");
const {CLEAR_ERROR} = require("../../../../../../src/lib/actions/error/clearError.js");

describe("clearError", function () {
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

    describe("CLEAR_ERROR", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(clearError());

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CLEAR_ERROR}]);
        });
    });
});
