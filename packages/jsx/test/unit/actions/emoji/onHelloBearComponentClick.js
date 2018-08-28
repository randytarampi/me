import {Bear} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {HANDLE_COMPONENT_CLICK} from "../../../../lib/actions/emoji/onComponentClick";
import onHelloBearComponentClick, {HANDLE_HELLO_BEAR_COMPONENT_CLICK} from "../../../../lib/actions/emoji/onHelloBearComponentClick";
import {UPDATE_EMOJI} from "../../../../lib/actions/emoji/updateEmoji";

describe("onHelloBearComponentClick", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubEmoji;

    const getExpectedEmoji = (stubEmoji, noseClicks) => {
        const rightLeaningLeftArm = ["components", "rightLeaningLeftArm", "character"];
        const leftEye = ["components", "leftEye", "character"];
        const rightEye = ["components", "rightEye", "character"];
        const rightLeaningRightArm = ["components", "rightLeaningRightArm", "character"];
        const rightAction = ["components", "rightAction", "character"];

        switch (noseClicks % 3) {
            case 1:
                return stubEmoji
                    .setIn(rightLeaningLeftArm, null)
                    .setIn(rightLeaningRightArm, null)
                    .setIn(rightAction, null);

            case 2:
                return stubEmoji
                    .setIn(leftEye, "ಠಿ")
                    .setIn(rightEye, "ಠ");

            case 3:
                return stubEmoji
                    .setIn(leftEye, "ಠ")
                    .setIn(rightEye, "ಠ");

            case 5:
                return stubEmoji
                    .setIn(leftEye, "◕")
                    .setIn(rightEye, "◕");

            case 8:
                return stubEmoji
                    .setIn(leftEye, "°")
                    .setIn(rightEye, "°");

            case 13:
                return stubEmoji
                    .setIn(rightLeaningLeftArm, null)
                    .setIn(leftEye, "–")
                    .setIn(rightEye, "–")
                    .setIn(rightLeaningRightArm, null)
                    .setIn(rightAction, null);

            case 21:
                return stubEmoji
                    .setIn(rightLeaningLeftArm, null)
                    .setIn(leftEye, " ͡°")
                    .setIn(rightEye, " ͡°")
                    .setIn(rightLeaningRightArm, null)
                    .setIn(rightAction, null);

            case 34:
                return stubEmoji
                    .setIn(rightLeaningRightArm, "ﾉ゛");

            case 35:
            case 36:
            default:
                return stubEmoji;
        }
    };

    beforeEach(function () {
        stubMiddleware = [thunk];
        stubEmoji = Bear.fromJS({id: "woof"});
        stubInitialState = Map({
            emoji: Map({
                [stubEmoji.id]: stubEmoji.asMutable()
            }).asMutable()
        }).asMutable();
        stubEmoji = stubInitialState.getIn(["emoji", stubEmoji.id]);
        mockStore = configureStore(stubMiddleware);
        stubStore = mockStore(stubInitialState);

        sinon.stub(window, "open").returns("undefined");
    });

    afterEach(function () {
        window.open.restore();
    });

    describe("HANDLE_HELLO_BEAR_COMPONENT_CLICK", function () {
        it("is dispatched with the expected payload", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 1;
            stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));

            const actions = stubStore.getActions();
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            expect(actions).to.be.ok;
            expect(actions).to.have.length(4 * numberOfClicks);
            expect(actions).to.eql([
                {
                    type: HANDLE_COMPONENT_CLICK,
                    payload: {
                        emojiId: stubEmoji.id,
                        componentId: clickedComponentId,
                        clicks: stubEmoji.getIn(emojiComponentClicks)
                    }
                },
                {
                    type: UPDATE_EMOJI,
                    payload: stubEmoji
                        .setIn(emojiComponentClicks, numberOfClicks)
                },
                {
                    type: HANDLE_HELLO_BEAR_COMPONENT_CLICK,
                    payload: {
                        emojiId: stubEmoji.id,
                        componentId: clickedComponentId,
                        noseClicks: stubEmoji.getIn(emojiComponentClicks)
                    }
                },
                {
                    type: UPDATE_EMOJI,
                    payload: getExpectedEmoji(stubEmoji, numberOfClicks)
                        .setIn(emojiComponentClicks, numberOfClicks)
                }
            ]);
        });

        it("is dispatched with the expected payload when invoked twice", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 2;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions).to.have.length(4 * numberOfClicks);
            expect(actions).to.eql(
                [].concat(...Array(numberOfClicks).fill("").map((value, index) => {
                    return [
                        {
                            type: HANDLE_COMPONENT_CLICK,
                            payload: {
                                emojiId: stubEmoji.id,
                                componentId: clickedComponentId,
                                clicks: index + 1
                            }
                        },
                        {
                            type: UPDATE_EMOJI,
                            payload: stubEmoji
                                .setIn(emojiComponentClicks, index + 1)
                        },
                        {
                            type: HANDLE_HELLO_BEAR_COMPONENT_CLICK,
                            payload: {
                                emojiId: stubEmoji.id,
                                componentId: clickedComponentId,
                                noseClicks: index + 1
                            }
                        },
                        {
                            type: UPDATE_EMOJI,
                            payload: getExpectedEmoji(stubEmoji, numberOfClicks)
                                .setIn(emojiComponentClicks, index + 1)
                        }
                    ];
                }))
            );
        });

        it("is dispatched with the expected payload when invoked thrice", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 3;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions).to.have.length(4 * numberOfClicks);
            expect(actions).to.eql(
                [].concat(...Array(numberOfClicks).fill("").map((value, index) => {
                    return [
                        {
                            type: HANDLE_COMPONENT_CLICK,
                            payload: {
                                emojiId: stubEmoji.id,
                                componentId: clickedComponentId,
                                clicks: index + 1
                            }
                        },
                        {
                            type: UPDATE_EMOJI,
                            payload: stubEmoji
                                .setIn(emojiComponentClicks, index + 1)
                        },
                        {
                            type: HANDLE_HELLO_BEAR_COMPONENT_CLICK,
                            payload: {
                                emojiId: stubEmoji.id,
                                componentId: clickedComponentId,
                                noseClicks: index + 1
                            }
                        },
                        {
                            type: UPDATE_EMOJI,
                            payload: getExpectedEmoji(stubEmoji, index + 1)
                                .setIn(emojiComponentClicks, index + 1)
                        }
                    ];
                }))
            );
        });

        it("is dispatched with the expected payload when invoked 5 times", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 5;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions[actions.length - 1]).to.eql({
                type: UPDATE_EMOJI,
                payload: getExpectedEmoji(stubEmoji, numberOfClicks)
                    .setIn(emojiComponentClicks, numberOfClicks)
            });
        });

        it("is dispatched with the expected payload when invoked 8 times", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 8;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions[actions.length - 1]).to.eql({
                type: UPDATE_EMOJI,
                payload: getExpectedEmoji(stubEmoji, numberOfClicks)
                    .setIn(emojiComponentClicks, numberOfClicks)
            });
        });

        it("is dispatched with the expected payload when invoked 13 times", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 13;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions[actions.length - 1]).to.eql({
                type: UPDATE_EMOJI,
                payload: getExpectedEmoji(stubEmoji, numberOfClicks)
                    .setIn(emojiComponentClicks, numberOfClicks)
            });
        });

        it("is dispatched with the expected payload when invoked 21 times", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 21;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions[actions.length - 1]).to.eql({
                type: UPDATE_EMOJI,
                payload: getExpectedEmoji(stubEmoji, numberOfClicks)
                    .setIn(emojiComponentClicks, numberOfClicks)
            });
        });

        it("is dispatched with the expected payload when invoked 34 times", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 34;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            window.open.restore();
            sinon.stub(window, "open").callsFake(mailto => {
                expect(mailto).to.match(/mailto:rt@randytarampi.ca/);
            });

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions[actions.length - 1]).to.eql({
                type: UPDATE_EMOJI,
                payload: getExpectedEmoji(stubEmoji, numberOfClicks)
                    .setIn(emojiComponentClicks, numberOfClicks)
            });
            expect(window.open.calledOnce).to.eql(true);
        });

        it("is dispatched with the expected payload when invoked 35 times", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 35;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            window.open.restore();
            sinon.stub(window, "open").callsFake(mailto => {
                expect(mailto).to.match(/mailto:rt@randytarampi.ca/);
            });

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions[actions.length - 1]).to.eql({
                payload: {
                    componentId: clickedComponentId,
                    emojiId: stubEmoji.id,
                    noseClicks: numberOfClicks
                },
                type: HANDLE_HELLO_BEAR_COMPONENT_CLICK
            });
            expect(window.open.calledTwice).to.eql(true);
        });

        it("is dispatched with the expected payload when invoked 36 times", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 36;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            window.open.restore();
            sinon.stub(window, "open").callsFake(mailto => {
                expect(mailto).to.match(/mailto:rt@randytarampi.ca/);
            });

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions[actions.length - 1]).to.eql({
                payload: {
                    componentId: clickedComponentId,
                    emojiId: stubEmoji.id,
                    noseClicks: numberOfClicks
                },
                type: HANDLE_HELLO_BEAR_COMPONENT_CLICK
            });
            expect(window.open.calledThrice).to.eql(true);
        });

        it("is dispatched with the expected payload when invoked 39 times", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 39;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            window.open.restore();
            sinon.stub(window, "open").callsFake(mailto => {
                expect(mailto).to.match(/mailto:rt@randytarampi.ca/);
            });

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onHelloBearComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState
                    .setIn(["emoji", stubEmoji.id], getExpectedEmoji(stubEmoji, index + 1).setIn(emojiComponentClicks, index + 1));
            });

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions[actions.length - 1]).to.eql({
                type: UPDATE_EMOJI,
                payload: getExpectedEmoji(stubEmoji, numberOfClicks)
                    .setIn(emojiComponentClicks, numberOfClicks)
            });
            expect(window.open.calledThrice).to.eql(true);
        });
    });
});
