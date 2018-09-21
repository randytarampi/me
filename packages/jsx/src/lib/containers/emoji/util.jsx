import {connect} from "react-redux";
import {clearEmojiCreator} from "../../actions/emoji/clearEmoji";
import {instantiateEmojiCreator} from "../../actions/emoji/instantiateEmoji";
import {onComponentClickCreator} from "../../actions/emoji/onComponentClick";
import selectors from "../../data/selectors";

export const connectEmoji = emojiComponent => connect(
    (state, ownProps) => {
        const emoji = selectors.getEmoji(state, ownProps.id) || ownProps.emoji.set("id", ownProps.id);

        return {
            emoji
        };
    },
    (dispatch, ownProps) => {
        return {
            clearEmoji: ownProps.clearEmoji
                ? ownProps.clearEmoji
                : () => dispatch(clearEmojiCreator(ownProps.emoji)),
            instantiateEmoji: ownProps.instantiateEmoji
                ? ownProps.instantiateEmoji
                : () => dispatch(instantiateEmojiCreator(ownProps.emoji.set("id", ownProps.id))),
            onComponentClick: ownProps.onComponentClick
                ? ownProps.onComponentClick
                : (componentId, clickEvent) => dispatch(onComponentClickCreator(ownProps.id, componentId, clickEvent))
        };
    }
)(emojiComponent);
