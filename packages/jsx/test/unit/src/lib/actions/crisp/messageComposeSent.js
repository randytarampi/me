const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const messageComposeSent = require("../../../../../../src/lib/actions/crisp/messageComposeSent.js").default || require("../../../../../../src/lib/actions/crisp/messageComposeSent.js");
const {CRISP_MESSAGE_COMPOSE_SENT} = require("../../../../../../src/lib/actions/crisp/messageComposeSent.js");

describe("messageComposeSent", function () {
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

    describe("CRISP_MESSAGE_COMPOSE_SENT", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(messageComposeSent(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_MESSAGE_COMPOSE_SENT, payload: stubPayload}]);
        });
    });
});
