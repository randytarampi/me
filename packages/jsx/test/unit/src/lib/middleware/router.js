import {expect} from "chai";
import {LOCATION_CHANGE} from "connected-react-router/immutable";
import sinon from "sinon";
import router from "../../../../../src/lib/middleware/router";

describe("router", function () {
    it("dispatches `clearError` on `LOCATION_CHANGE`", function () {
        const stubStore = {
            dispatch: sinon.stub()
        };
        const stubNext = sinon.stub();
        const stubAction = {
            type: LOCATION_CHANGE,
            payload: "grr"
        };

        router(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.dispatch.calledOnce).to.eql(true);
    });

    it("calls `next` on everything else", function () {
        const stubStore = {
            dispatch: sinon.stub()
        };
        const stubNext = sinon.stub();
        const stubAction = {
            type: "woof",
            payload: "grr"
        };

        router(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(stubStore.dispatch.notCalled).to.eql(true);
    });
});
