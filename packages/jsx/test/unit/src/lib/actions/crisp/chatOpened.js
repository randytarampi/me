const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const chatOpened = require("../../../../../../src/lib/actions/crisp/chatOpened.js").default || require("../../../../../../src/lib/actions/crisp/chatOpened.js");
const {CRISP_CHAT_OPENED} = require("../../../../../../src/lib/actions/crisp/chatOpened.js");

describe("chatOpened", function () {
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

    describe("CRISP_CHAT_OPENED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(chatOpened());

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_CHAT_OPENED}]);
        });
    });
});
