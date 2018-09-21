import {Bear, defaultBearComponents} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import onBearComponentClick, {HANDLE_BEAR_COMPONENT_CLICK} from "../../../../../src/lib/actions/emoji/onBearComponentClick";
import {HANDLE_COMPONENT_CLICK} from "../../../../../src/lib/actions/emoji/onComponentClick";
import {UPDATE_EMOJI} from "../../../../../src/lib/actions/emoji/updateEmoji";

describe("onBearComponentClick", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubEmoji;

    const getExpectedEmoji = (stubEmoji, noseClicks) => {
        const leftEye = ["components", "leftEye", "character"];
        const rightEye = ["components", "rightEye", "character"];

        switch (noseClicks % 3) {
            case 1:
                return stubEmoji
                    .setIn(leftEye, "ಠಿ")
                    .setIn(rightEye, "ಠ");
            case 2:
                return stubEmoji
                    .setIn(leftEye, "ಠ")
                    .setIn(rightEye, "ಠ");

            case 3:
            case 0:
                return stubEmoji
                    .setIn(leftEye, defaultBearComponents.leftEye.character)
                    .setIn(rightEye, defaultBearComponents.rightEye.character);
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
    });

    describe("HANDLE_BEAR_COMPONENT_CLICK", function () {
        it("is dispatched with the expected payload", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 1;
            stubStore.dispatch(onBearComponentClick(stubEmoji.id, clickedComponentId));

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
                    type: HANDLE_BEAR_COMPONENT_CLICK,
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
                stubStore.dispatch(onBearComponentClick(stubEmoji.id, clickedComponentId));
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
                            type: HANDLE_BEAR_COMPONENT_CLICK,
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
                stubStore.dispatch(onBearComponentClick(stubEmoji.id, clickedComponentId));
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
                            type: HANDLE_BEAR_COMPONENT_CLICK,
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
    });
});
