import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import chatOpened, {CRISP_CHAT_OPENED} from "../../../../../../src/lib/actions/crisp/chatOpened";

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
