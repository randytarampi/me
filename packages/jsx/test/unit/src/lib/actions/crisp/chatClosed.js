import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import chatClosed, {CRISP_CHAT_CLOSED} from "../../../../../../src/lib/actions/crisp/chatClosed";

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
