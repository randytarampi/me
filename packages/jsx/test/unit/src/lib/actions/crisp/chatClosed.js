const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const chatClosed = require("../../../../../../src/lib/actions/crisp/chatClosed.js").default || require("../../../../../../src/lib/actions/crisp/chatClosed.js");
const {CRISP_CHAT_CLOSED} = require("../../../../../../src/lib/actions/crisp/chatClosed.js");

describe("chatClosed", function () {
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

    describe("CRISP_CHAT_CLOSED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(chatClosed());

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_CHAT_CLOSED}]);
        });
    });
});
