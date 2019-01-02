import {connect} from "react-redux";
import {setControlStateCreator} from "../actions";
import {buildPostMarkerId, PostMarkerComponent} from "../components/postMarker";
import selectors from "../data/selectors";

export const connectPostMarker = connect(
    (state, ownProps) => {
        const {post} = ownProps;
        const postMarkerId = buildPostMarkerId(post);
        const controlState = selectors.getControlStateForId(state, postMarkerId);

        return {
            isVisible: controlState ? controlState.get("visible") : false
        };
    },
    (dispatch, ownProps) => {
        const {post} = ownProps;
        const postMarkerId = buildPostMarkerId(post);

        return {
            onVisibilityToggle: shouldBeVisible => dispatch(setControlStateCreator(postMarkerId, {
                visible: !!shouldBeVisible
            }))
        };
    }
);

export const ConnectedPostMarker = connectPostMarker(PostMarkerComponent);

export default ConnectedPostMarker;
