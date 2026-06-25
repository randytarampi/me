const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const messageReceived = require("../../../../../../src/lib/actions/crisp/messageReceived.js").default || require("../../../../../../src/lib/actions/crisp/messageReceived.js");
const {CRISP_MESSAGE_RECEIVED} = require("../../../../../../src/lib/actions/crisp/messageReceived.js");

describe("messageReceived", function () {
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

    describe("CRISP_MESSAGE_RECEIVED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(messageReceived(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_MESSAGE_RECEIVED, payload: stubPayload}]);
        });
    });
});
