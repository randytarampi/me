import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import userEmailChanged, {CRISP_USER_EMAIL_CHANGED} from "../../../../../../src/lib/actions/crisp/userEmailChanged";

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

            expect(actions).to.be.ok;
            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_USER_EMAIL_CHANGED, payload: stubPayload}]);
        });
    });
});
