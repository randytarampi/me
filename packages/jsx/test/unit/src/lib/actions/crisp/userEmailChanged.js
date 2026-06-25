const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const userEmailChanged = require("../../../../../../src/lib/actions/crisp/userEmailChanged.js").default || require("../../../../../../src/lib/actions/crisp/userEmailChanged.js");
const {CRISP_USER_EMAIL_CHANGED} = require("../../../../../../src/lib/actions/crisp/userEmailChanged.js");

describe("userEmailChanged", function () {
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

    describe("CRISP_USER_EMAIL_CHANGED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(userEmailChanged(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_USER_EMAIL_CHANGED, payload: stubPayload}]);
        });
    });
});
