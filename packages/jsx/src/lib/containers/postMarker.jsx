import {POST_ENTITIES} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setControlStateCreator, setGoogleMapCenterCreator} from "../actions/index.js";
import {buildPostMarkerId, PostMarkerComponent} from "../components/postMarker.jsx";
import selectors from "../data/selectors.js";

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
        const {getGoogleMap, mapId, post} = ownProps;
        const postMarkerId = buildPostMarkerId(post);

        return {
            setMapCenter: newCenter => dispatch(setGoogleMapCenterCreator(getGoogleMap, mapId, newCenter)),
            onVisibilityToggle: shouldBeVisible => dispatch(setControlStateCreator(postMarkerId, {
                visible: !!shouldBeVisible
            }))
        };
    }
);

export const ConnectedPostMarker = connectPostMarker(PostMarkerComponent);

ConnectedPostMarker.propTypes = {
    getGoogleMap: PropTypes.func.isRequired,
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    mapId: PropTypes.string.isRequired
};

export default ConnectedPostMarker;
