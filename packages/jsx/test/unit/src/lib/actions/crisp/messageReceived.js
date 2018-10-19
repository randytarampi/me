import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import messageReceived, {CRISP_MESSAGE_RECEIVED} from "../../../../../../src/lib/actions/crisp/messageReceived";

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

            expect(actions).to.be.ok;
            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_MESSAGE_RECEIVED, payload: stubPayload}]);
        });
    });
});
