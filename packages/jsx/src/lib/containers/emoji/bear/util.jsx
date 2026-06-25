import {connect} from "react-redux";
import {onBearComponentClickCreator} from "../../../actions/emoji/onBearComponentClick.js";
import {connectEmoji} from "../util.jsx";

export const connectBear = emojiComponent => connect(
    null,
    (dispatch, ownProps) => {
        return {
            onComponentClick: ownProps.onComponentClick
                ? ownProps.onComponentClick
                : (componentId, clickEvent) => dispatch(onBearComponentClickCreator(ownProps.id, componentId, clickEvent))
        };
    }
)(connectEmoji(emojiComponent));
