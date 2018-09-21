import {Bear as BearEntity} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import {Emoji as EmojiComponent} from "../../../components/emoji";
import {connectBear} from "./util";

export const ConnectedBear = connectBear(EmojiComponent);

ConnectedBear.propTypes = {
    id: PropTypes.string.isRequired,
    emoji: PropTypes.object.isRequired
};

ConnectedBear.defaultProps = {
    emoji: new BearEntity()
};

export default ConnectedBear;
