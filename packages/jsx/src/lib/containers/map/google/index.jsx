import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    instantiateGoogleMapCreator,
    onGoogleMapBoundsChangedCreator,
    onGoogleMapHeadingChangedCreator,
    onGoogleMapIdleCreator,
    onGoogleMapMapTypeIdChangedCreator,
    onGoogleMapTiltChangedCreator,
    onGoogleMapZoomChangedCreator
} from "../../../actions/map/google";
import {GoogleMapComponent} from "../../../components/map";

export const connectGoogleMap = connect(
    null,
    (dispatch, ownProps) => {
        const defaultMapActionCreators = {
            instantiateMap: instantiateGoogleMapCreator,
            onBoundsChanged: onGoogleMapBoundsChangedCreator,
            onHeadingChanged: onGoogleMapHeadingChangedCreator,
            onIdle: onGoogleMapIdleCreator,
            onMapTypeIdChanged: onGoogleMapMapTypeIdChangedCreator,
            onTiltChanged: onGoogleMapTiltChangedCreator,
            onZoomChanged: onGoogleMapZoomChangedCreator
        };
        const boundMapActionCreators = bindActionCreators(defaultMapActionCreators, dispatch);
        const passedAndMappedMapActionCreators = Object.keys(ownProps).reduce((passedAndMappedMapActionCreators, passedPropKey) => {
            const defaultMapActionCreator = defaultMapActionCreators[passedPropKey];

            if (defaultMapActionCreator) {
                const passedAndMappedMapActionCreator = ownProps[passedPropKey];

                passedAndMappedMapActionCreators[passedPropKey] = (...args) => {
                    return dispatch(defaultMapActionCreator.apply(null, args))
                        .then(() => passedAndMappedMapActionCreator.apply(null, args));
                };
            }

            return passedAndMappedMapActionCreators;
        }, {});

        return {
            ...boundMapActionCreators,
            ...passedAndMappedMapActionCreators
        };
    },
    null,
    {withRef: true}
);

export const ConnectedGoogleMap = connectGoogleMap(GoogleMapComponent);

ConnectedGoogleMap.propTypes = {
    id: PropTypes.string.isRequired,
    instantiateMap: PropTypes.func,
    onBoundsChanged: PropTypes.func,
    onHeadingChanged: PropTypes.func,
    onIdle: PropTypes.func,
    onMapTypeIdChanged: PropTypes.func,
    onTiltChanged: PropTypes.func,
    onZoomChanged: PropTypes.func
};

export default ConnectedGoogleMap;
