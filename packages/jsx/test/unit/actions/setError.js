import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import setError, {SET_ERROR} from "../../../lib/actions/setError";

describe("setError", function () {
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

    describe("SET_ERROR", function () {
        it("is dispatched with the expected payload", function () {
            const stubError = new Error("woof");

            stubError.errorCode = "EWOOF";
            stubError.errorMessage = stubError.message;

            const stubPayload = {
                error: stubError,
                errorCode: stubError.errorCode,
                errorMessage: stubError.errorMessage
            };
            stubStore.dispatch(setError(stubPayload.error, stubPayload.errorCode, stubPayload.errorMessage));

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: SET_ERROR,
                payload: stubPayload
            }]);
        });
    });
});
