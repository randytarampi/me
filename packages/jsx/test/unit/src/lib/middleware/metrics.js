import {expect} from "chai";
import sinon from "sinon";
import metricsInstance from "@randy.tarampi/redux-metrics";
import metrics from "../../../../../src/lib/middleware/metrics";
import {
    CRISP_CHAT_CLOSED,
    CRISP_CHAT_OPENED,
    CRISP_MESSAGE_SENT,
    CRISP_SESSION_LOADED,
    CRISP_USER_AVATAR_CHANGED,
    CRISP_USER_EMAIL_CHANGED,
    CRISP_USER_NICKNAME_CHANGED,
    CRISP_USER_PHONE_CHANGED,
    CRISP_WEBSITE_AVAILABILITY_CHANGED
} from "./../../../../../src/lib/actions/crisp";

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

    describe("CRISP_CHAT_OPENED", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_CHAT_OPENED,
                payload: {}
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                crisp: {
                    chat: "open"
                }
            }]);
        });
    });

    describe("CRISP_CHAT_CLOSED", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_CHAT_CLOSED,
                payload: {}
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                crisp: {
                    chat: "closed"
                }
            }]);
        });
    });

    describe("CRISP_MESSAGE_SENT", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_MESSAGE_SENT,
                payload: {
                    user: {
                        user_id: "woof",
                        nickname: "meow"
                    }
                }
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                crisp: {
                    user_id: stubAction.payload.user.user_id
                },
                user: {
                    name: stubAction.payload.user.nickname
                }
            }]);
        });
    });

    describe("CRISP_SESSION_LOADED", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_SESSION_LOADED,
                payload: "woof"
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                crisp: {
                    session_id: stubAction.payload
                }
            }]);
        });
    });

    describe("CRISP_USER_AVATAR_CHANGED", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_USER_AVATAR_CHANGED,
                payload: "woof"
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                user: {
                    avatar: stubAction.payload
                }
            }]);
        });
    });

    describe("CRISP_USER_EMAIL_CHANGED", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_USER_EMAIL_CHANGED,
                payload: "woof"
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                user: {
                    email: stubAction.payload
                }
            }]);
        });
    });

    describe("CRISP_USER_NICKNAME_CHANGED", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_USER_NICKNAME_CHANGED,
                payload: "woof"
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                user: {
                    name: stubAction.payload
                }
            }]);
        });
    });

    describe("CRISP_USER_PHONE_CHANGED", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_USER_PHONE_CHANGED,
                payload: "woof"
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                user: {
                    phone: stubAction.payload
                }
            }]);
        });
    });

    describe("CRISP_WEBSITE_AVAILABILITY_CHANGED", function () {
        it("calls `trackReduxAction` with the correct properties", function () {
            const stubNext = sinon.stub();
            const stubAction = {
                type: CRISP_WEBSITE_AVAILABILITY_CHANGED,
                payload: "woof"
            };

            metrics()(stubNext)(stubAction);
            expect(stubNext.calledOnce).to.eql(true);
            expect(metricsInstance.api.trackReduxAction.calledOnce).to.eql(true);
            sinon.assert.calledWith(metricsInstance.api.trackReduxAction, [stubAction, {
                app: {
                    availability: stubAction.payload
                }
            }]);
        });
    });
});
