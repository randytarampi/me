import {connect} from "react-redux";
import {Emoji as EmojiEntity} from "@randy.tarampi/js";
import {clearEmojiCreator} from "../../actions/emoji/clearEmoji";
import {instantiateEmojiCreator} from "../../actions/emoji/instantiateEmoji";
import {onComponentClickCreator} from "../../actions/emoji/onComponentClick";
import selectors from "../../data/selectors";

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
