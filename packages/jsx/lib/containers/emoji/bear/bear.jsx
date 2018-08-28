import {Bear as BearEntity} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {connectEmoji} from "../";
import onBearComponentClick from "../../../actions/emoji/onBearComponentClick";
import {Emoji as EmojiComponent} from "../../../components/emoji";

export const connectBear = emoji => connect(
    null,
    (dispatch, ownProps) => {
        return {
            onComponentClick: ownProps.onComponentClick
                ? ownProps.onComponentClick
                : (componentId, clickEvent) => dispatch(onBearComponentClick(ownProps.id, componentId, clickEvent))
        };
    }
)(connectEmoji(emoji));

export const Bear = connectBear(EmojiComponent);

Bear.propTypes = {
    id: PropTypes.string.isRequired,
    emoji: PropTypes.object.isRequired
};

Bear.defaultProps = {
    emoji: new BearEntity()
};

export default Bear;
