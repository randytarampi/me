import {HelloBear as HelloBearEntity} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import onHelloBearComponentClick from "../../../actions/emoji/onHelloBearComponentClick";
import {Emoji as EmojiComponent} from "../../../components/emoji";
import {connectBear} from "./bear";

export const connectHelloBear = emoji => connect(
    null,
    (dispatch, ownProps) => {
        return {
            onComponentClick: ownProps.onComponentClick
                ? ownProps.onComponentClick
                : (componentId, clickEvent) => dispatch(onHelloBearComponentClick(ownProps.id, componentId, clickEvent))
        };
    }
)(connectBear(emoji));

export const HelloBear = connectHelloBear(EmojiComponent);

HelloBear.propTypes = {
    id: PropTypes.string.isRequired,
    emoji: PropTypes.object.isRequired
};

HelloBear.defaultProps = {
    emoji: HelloBearEntity.fromJS()
};

export default HelloBear;
