import {HelloBear as HelloBearEntity} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import onHelloBearComponentClick from "../../../actions/emoji/onHelloBearComponentClick";
import {Emoji as EmojiComponent} from "../../../components/emoji";
import {connectBear} from "./util";

export const connectHelloBear = emojiComponent => connect(
    null,
    (dispatch, ownProps) => {
        return {
            onComponentClick: ownProps.onComponentClick
                ? ownProps.onComponentClick
                : (componentId, clickEvent) => dispatch(onHelloBearComponentClick(ownProps.id, componentId, clickEvent))
        };
    }
)(connectBear(emojiComponent));

export const ConnectedHelloBear = connectHelloBear(EmojiComponent);

ConnectedHelloBear.propTypes = {
    id: PropTypes.string.isRequired,
    emoji: PropTypes.object.isRequired
};

ConnectedHelloBear.defaultProps = {
    emoji: HelloBearEntity.fromJS()
};

export default ConnectedHelloBear;
