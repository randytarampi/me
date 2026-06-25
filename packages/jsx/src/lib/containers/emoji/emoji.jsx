import {Emoji as EmojiEntity} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import {Emoji as EmojiComponent} from "../../components/emoji.jsx";
import {connectEmoji} from "./util.jsx";

export const ConnectedEmoji = connectEmoji(EmojiComponent);

ConnectedEmoji.propTypes = {
    id: PropTypes.string.isRequired,
    emoji: PropTypes.object.isRequired
};

ConnectedEmoji.defaultProps = {
    emoji: new EmojiEntity()
};

export default ConnectedEmoji;
