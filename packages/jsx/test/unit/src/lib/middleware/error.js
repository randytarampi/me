import {expect} from "chai";
import sinon from "sinon";
import {CLEAR_ERROR} from "../../../../../src/lib/actions/clearError";
import selectors from "../../../../../src/lib/data/selectors";
import error from "../../../../../src/lib/middleware/error";

describe("error", function () {
    beforeEach(function () {
        sinon.stub(selectors, "getErrorTimeoutHandlerId").returns("woof");
        sinon.stub(global, "clearTimeout");
    });

    afterEach(function () {
        selectors.getErrorTimeoutHandlerId.restore();
        global.clearTimeout.restore();
    });

    it("calls `clearTimeout` on `CLEAR_ERROR` if there is a timeout to clear", function () {
        const stubStore = {
            dispatch: sinon.stub(),
            getState: sinon.stub()
        };
        const stubNext = sinon.stub();
        const stubAction = {
            type: CLEAR_ERROR
        };

        error(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(global.clearTimeout.calledOnce).to.eql(true);
        sinon.assert.calledWith(global.clearTimeout, "woof");
    });

    it("doesn't call `clearTimeout` on `CLEAR_ERROR` if there is no timeout to clear", function () {
        selectors.getErrorTimeoutHandlerId.restore();
        sinon.stub(selectors, "getErrorTimeoutHandlerId").returns(null);

        const stubStore = {
            dispatch: sinon.stub(),
            getState: sinon.stub()
        };
        const stubNext = sinon.stub();
        const stubAction = {
            type: CLEAR_ERROR
        };

        error(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(global.clearTimeout.notCalled).to.eql(true);
    });

    it("calls `next` on everything else", function () {
        const stubStore = {
            dispatch: sinon.stub(),
            getState: sinon.stub()
        };
        const stubNext = sinon.stub();
        const stubAction = {
            type: "woof",
            payload: "grr"
        };

        error(stubStore)(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(global.clearTimeout.notCalled).to.eql(true);
    });
});
