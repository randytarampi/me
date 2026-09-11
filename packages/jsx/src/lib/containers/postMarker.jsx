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
    },
    // No custom mergeProps; `areOwnPropsEqual` must arrive in connect's fourth
    // (options) argument or react-redux treats the object as mergeProps and throws
    // "Invalid value of type object for mergeProps argument" at render time.
    null,
    {
        areOwnPropsEqual: (previous, next) => previous.getGoogleMap === next.getGoogleMap
            && previous.mapId === next.mapId
            && previous.setMarkerRef === next.setMarkerRef
            && previous.post.uid === next.post.uid
            && previous.post.type === next.post.type
            && previous.post.source === next.post.source
            && previous.post.title === next.post.title
    }
);

export const ConnectedPostMarker = connectPostMarker(PostMarkerComponent);

ConnectedPostMarker.propTypes = {
    getGoogleMap: PropTypes.func.isRequired,
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    mapId: PropTypes.string.isRequired
};

export default ConnectedPostMarker;
