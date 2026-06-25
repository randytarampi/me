const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const messageSent = require("../../../../../../src/lib/actions/crisp/messageSent.js").default || require("../../../../../../src/lib/actions/crisp/messageSent.js");
const {CRISP_MESSAGE_SENT} = require("../../../../../../src/lib/actions/crisp/messageSent.js");

describe("messageSent", function () {
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

    describe("CRISP_MESSAGE_SENT", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(messageSent(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_MESSAGE_SENT, payload: stubPayload}]);
        });
    });
});
