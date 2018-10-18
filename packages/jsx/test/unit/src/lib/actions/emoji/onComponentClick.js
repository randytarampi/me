import {Emoji} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import onComponentClick, {HANDLE_COMPONENT_CLICK} from "../../../../../../src/lib/actions/emoji/onComponentClick";
import {UPDATE_EMOJI} from "../../../../../../src/lib/actions/emoji/updateEmoji";

describe("onComponentClick", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubEmoji;

    beforeEach(function () {
        stubMiddleware = [thunk];
        stubEmoji = Emoji.fromJS({id: "woof"});
        stubInitialState = Map({
            emoji: Map({
                [stubEmoji.id]: stubEmoji
            })
        }).asMutable();
        mockStore = configureStore(stubMiddleware);
        stubStore = mockStore(stubInitialState);
    });

    describe("HANDLE_COMPONENT_CLICK", function () {
        it("is dispatched with the expected payload", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 1;
            stubStore.dispatch(onComponentClick(stubEmoji.id, clickedComponentId));

            const actions = stubStore.getActions();
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];
            const expectedEmojiUpdate = stubEmoji
                .setIn(emojiComponentClicks, numberOfClicks);

            expect(actions).to.be.ok;
            expect(actions).to.have.length(2 * numberOfClicks);
            expect(actions).to.eql([
                {
                    type: HANDLE_COMPONENT_CLICK,
                    payload: {
                        emojiId: expectedEmojiUpdate.id,
                        componentId: clickedComponentId,
                        clicks: expectedEmojiUpdate.getIn(emojiComponentClicks)
                    }
                },
                {
                    type: UPDATE_EMOJI,
                    payload: expectedEmojiUpdate
                }
            ]);
        });

        it("is dispatched with the expected payload when invoked more than once", function () {
            const clickedComponentId = "nose";
            const numberOfClicks = 2;
            const emojiComponentClicks = ["components", clickedComponentId, "meta", "clicks"];

            Array(numberOfClicks).fill("").forEach((value, index) => {
                stubStore.dispatch(onComponentClick(stubEmoji.id, clickedComponentId));
                stubInitialState.setIn(["emoji", stubEmoji.id].concat(emojiComponentClicks), index + 1);
            });

            const actions = stubStore.getActions();
            const expectedEmojiUpdate = stubEmoji
                .setIn(emojiComponentClicks, numberOfClicks);

            expect(actions).to.be.ok;
            expect(actions).to.have.length(2 * numberOfClicks);
            expect(actions).to.eql(
                [].concat(...Array(numberOfClicks).fill("").map((value, index) => {
                    return [
                        {
                            type: HANDLE_COMPONENT_CLICK,
                            payload: {
                                emojiId: expectedEmojiUpdate.id,
                                componentId: clickedComponentId,
                                clicks: index + 1
                            }
                        },
                        {
                            type: UPDATE_EMOJI,
                            payload: expectedEmojiUpdate
                                .setIn(emojiComponentClicks, index + 1)
                        }
                    ];
                }))
            );
        });
    });
});
