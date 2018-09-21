import {expect} from "chai";
import {Map} from "immutable";
import {createAction} from "redux-actions";
import {clearError} from "../../../../src/lib/actions/clearError";
import {setError} from "../../../../src/lib/actions/setError";
import reducer, {
    getError,
    getErrorCode,
    getErrorMessage,
    getErrorState,
    hasError
} from "../../../../src/lib/data/error";

describe("error", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map();
    });

    it("reduces the current state for some other action", function () {
        const stubError = new Error("woof");
        stubError.errorCode = "EWOOF";
        stubError.errorMessage = stubError.message;
        const stubPayload = {
            error: stubError,
            errorCode: stubError.errorCode,
            errorMessage: stubError.errorMessage
        };

        const otherAction = createAction("OTHER_ACTION");
        const updatedState = reducer(stubInitialState, otherAction(stubPayload));
        const errorState = getErrorState(updatedState);
        expect(errorState).to.be.ok;
        expect(errorState.size).to.eql(0);

        const errorExists = hasError(errorState);
        expect(errorExists).to.eql(false);
        const error = getError(errorState);
        expect(error).to.eql(undefined);
        const errorCode = getErrorCode(errorState);
        expect(errorCode).to.eql(undefined);
        const errorMessage = getErrorMessage(errorState);
        expect(errorMessage).to.eql(undefined);
    });

    describe("SET_ERROR", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubError = new Error("woof");
            stubError.errorCode = "EWOOF";
            stubError.errorMessage = stubError.message;
            const stubPayload = {
                error: stubError,
                errorCode: stubError.errorCode,
                errorMessage: stubError.errorMessage
            };

            const updatedState = reducer(stubInitialState, setError(stubPayload));
            const errorState = getErrorState(updatedState);
            expect(errorState).to.be.ok;

            const error = getError(errorState);
            expect(error).to.eql(stubPayload.error);
            const errorCode = getErrorCode(errorState);
            expect(errorCode).to.eql(stubPayload.errorCode);
            const errorMessage = getErrorMessage(errorState);
            expect(errorMessage).to.eql(stubPayload.errorMessage);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubError = new Error("woof");
            stubError.errorCode = "EWOOF";
            stubError.errorMessage = stubError.message;
            const stubPayload = {
                error: stubError,
                errorCode: stubError.errorCode,
                errorMessage: stubError.errorMessage
            };

            stubInitialState = Map({
                error: new Error("meow"),
                errorCode: "EMEOW",
                errorMessage: "meow"
            });
            const updatedState = reducer(stubInitialState, setError(stubPayload));
            const errorState = getErrorState(updatedState);
            expect(errorState).to.be.ok;

            const error = getError(errorState);
            expect(error).to.eql(stubPayload.error);
            const errorCode = getErrorCode(errorState);
            expect(errorCode).to.eql(stubPayload.errorCode);
            const errorMessage = getErrorMessage(errorState);
            expect(errorMessage).to.eql(stubPayload.errorMessage);
        });
    });

    describe("CLEAR_ERROR", function () {
        it("reduces the correct state (no prior state)", function () {
            const updatedState = reducer(stubInitialState, clearError());
            const errorState = getErrorState(updatedState);
            expect(errorState).to.be.ok;

            const error = getError(errorState);
            expect(error).to.eql(undefined);
            const errorCode = getErrorCode(errorState);
            expect(errorCode).to.eql(undefined);
            const errorMessage = getErrorMessage(errorState);
            expect(errorMessage).to.eql(undefined);
        });

        it("reduces the correct state (has existing state)", function () {
            stubInitialState = Map({
                error: new Error("meow"),
                errorCode: "EMEOW",
                errorMessage: "meow"
            });
            const updatedState = reducer(stubInitialState, clearError());
            const errorState = getErrorState(updatedState);
            expect(errorState).to.be.ok;

            const error = getError(errorState);
            expect(error).to.eql(undefined);
            const errorCode = getErrorCode(errorState);
            expect(errorCode).to.eql(undefined);
            const errorMessage = getErrorMessage(errorState);
            expect(errorMessage).to.eql(undefined);
        });
    });
});
