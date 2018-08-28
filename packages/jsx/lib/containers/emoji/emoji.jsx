import {Emoji as EmojiEntity} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import clearEmoji from "../../actions/emoji/clearEmoji";
import instantiateEmoji from "../../actions/emoji/instantiateEmoji";
import onComponentClick from "../../actions/emoji/onComponentClick";
import {Emoji as EmojiComponent} from "../../components/emoji";
import selectors from "../../data/selectors";

export const connectEmoji = emoji => connect(
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
                : () => dispatch(clearEmoji(ownProps.emoji)),
            instantiateEmoji: ownProps.instantiateEmoji
                ? ownProps.instantiateEmoji
                : () => dispatch(instantiateEmoji(ownProps.emoji.set("id", ownProps.id))),
            onComponentClick: ownProps.onComponentClick
                ? ownProps.onComponentClick
                : (componentId, clickEvent) => dispatch(onComponentClick(ownProps.id, componentId, clickEvent))
        };
    }
)(emoji);

export const Emoji = connectEmoji(EmojiComponent);

Emoji.propTypes = {
    id: PropTypes.string.isRequired,
    emoji: PropTypes.object.isRequired
};

Emoji.defaultProps = {
    emoji: new EmojiEntity()
};

export default Emoji;
