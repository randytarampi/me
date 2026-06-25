const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const setError = require("../../../../../../src/lib/actions/error/setError.js").default || require("../../../../../../src/lib/actions/error/setError.js");
const {SET_ERROR} = require("../../../../../../src/lib/actions/error/setError.js");

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
        it("is dispatched with the expected payload (error)", function () {
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

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: SET_ERROR,
                payload: stubPayload
            }]);
        });

        it("is dispatched with the expected payload (errorCode and errorMessage)", function () {
            const stubError = new Error("woof");

            stubError.errorCode = "EWOOF";
            stubError.errorMessage = stubError.message;

            const stubPayload = {
                errorCode: stubError.errorCode,
                errorMessage: stubError.errorMessage
            };
            stubStore.dispatch(setError(null, stubPayload.errorCode, stubPayload.errorMessage));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: SET_ERROR,
                payload: {
                    error: null,
                    ...stubPayload
                }
            }]);
        });
    });
});
