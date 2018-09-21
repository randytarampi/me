import {expect} from "chai";
import sinon from "sinon";
import metricsInstance from "../../../../src/lib/metrics";
import metrics from "../../../../src/lib/middleware/metrics";

describe("metrics", function () {
    const metricsInstanceApi = metricsInstance.api;

    beforeEach(function () {
        Object.defineProperty(metricsInstance, "api", {
            value: {
                trackReduxAction: sinon.stub()
            },
            writable: false
        });
    });

    afterEach(function () {
        Object.defineProperty(metricsInstance, "api", {
            value: metricsInstanceApi,
            writable: false
        });
    });

    it("calls `trackReduxAction` with the correct properties", function () {
        const stubNext = sinon.stub();
        const stubAction = {
            type: "woof",
            payload: "grr"
        };

        metrics()(stubNext)(stubAction);
        expect(stubNext.calledOnce).to.eql(true);
        expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
        sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction]);
    });

    it("calls `next` before anything else", function () {
        const stubNext = sinon.stub();
        const stubAction = {
            type: "woof",
            payload: "grr"
        };

        Object.defineProperty(metricsInstance, "api", {
            value: {
                trackReduxAction: sinon.stub().throws(new Error("woof"))
            },
            writable: false
        });

        try {
            metrics()(stubNext)(stubAction);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error).to.be.ok;
            expect(error.message).to.eql("woof");
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
        }
    });

    it("doesn't call `trackReduxAction` if it's not a function", function () {
        const stubNext = sinon.stub();
        const stubAction = {
            type: "woof",
            payload: "grr"
        };

        Object.defineProperty(metricsInstance, "api", {
            value: {
                trackReduxAction: null
            },
            writable: false
        });

        metrics()(stubNext)(stubAction);

        expect(stubNext.calledOnce).to.eql(true);
    });
});
