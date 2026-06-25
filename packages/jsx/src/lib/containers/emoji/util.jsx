import {connect} from "react-redux";
import {Emoji as EmojiEntity} from "@randy.tarampi/js";
import {clearEmojiCreator} from "../../actions/emoji/clearEmoji.js";
import {instantiateEmojiCreator} from "../../actions/emoji/instantiateEmoji.js";
import {onComponentClickCreator} from "../../actions/emoji/onComponentClick.js";
import selectors from "../../data/selectors.js";

export const connectEmoji = emojiComponent => connect(
    (state, ownProps) => {
        const baseEmoji = ownProps.emoji || new EmojiEntity();
        const emoji = selectors.getEmoji(state, ownProps.id) || baseEmoji.set("id", ownProps.id);

        return {
            emoji
        };
    },
    (dispatch, ownProps) => {
        const baseEmoji = ownProps.emoji || new EmojiEntity();

        return {
            clearEmoji: ownProps.clearEmoji
                ? ownProps.clearEmoji
                : () => dispatch(clearEmojiCreator(baseEmoji)),
            instantiateEmoji: ownProps.instantiateEmoji
                ? ownProps.instantiateEmoji
                : () => dispatch(instantiateEmojiCreator(baseEmoji.set("id", ownProps.id))),
            onComponentClick: ownProps.onComponentClick
                ? ownProps.onComponentClick
                : (componentId, clickEvent) => dispatch(onComponentClickCreator(ownProps.id, componentId, clickEvent))
        };
    }
)(emojiComponent);
