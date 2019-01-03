import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";
import {LoadingSpinner} from "../../loadingSpinner";
import {MAP_CONTAINER_HEIGHT_PX} from "../util";
import {GoogleMapStyles} from "./styles";

export const MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${__GCP_API_KEY__}&v=3.exp&libraries=geometry,drawing,places`;

export * from "./markerClusterer";

export const ComposedGoogleMap = withScriptjs(withGoogleMap(({googleMapRef, ...props}) => <GoogleMap
    ref={googleMapRef} {...props}/>));

ComposedGoogleMap.defaultProps = {
    googleMapURL: MAP_API_URL,
    defaultZoom: 10,
    defaultCenter: {
        lat: 49.242250,
        lng: -123.046250
    },
    // defaultMapTypeId: "terrain", // NOTE-RT: google.maps.MapTypeId.TERRAIN
    defaultOptions: {
        minZoom: 2,
        styles: GoogleMapStyles,
        streetViewControl: true,
        streetViewControlOptions: {
            position: 6 // NOTE-RT: google.maps.ControlPosition.BOTTOM_LEFT
        },
        zoomControl: true,
        zoomControlOptions: {
            position: 6 // NOTE-RT: google.maps.ControlPosition.BOTTOM_LEFT
        }
    }
};

const googleMapCallbacks = [
    "onDblClick",
    "onDragEnd",
    "onDragStart",
    "onMapTypeIdChanged",
    "onMouseMove",
    "onMouseOut",
    "onMouseOver",
    "onRightClick",
    "onTilesLoaded",
    "onBoundsChanged",
    "onCenterChanged",
    "onClick",
    "onDrag",
    "onHeadingChanged",
    "onIdle",
    "onProjectionChanged",
    "onResize",
    "onTiltChanged",
    "onZoomChanged"
];

export class GoogleMapComponent extends PureComponent {
    constructor(props) {
        const propsKeys = Object.keys(props);

        super(props);

        this.googleMapRef = React.createRef();
        this.getGoogleMap = this.getGoogleMap.bind(this);
        this.passedGoogleMapCallbackProps = propsKeys.reduce((passedGoogleMapCallbackProps, propKey) => {
            if (googleMapCallbacks.includes(propKey)) {
                passedGoogleMapCallbackProps[propKey] = props[propKey].bind(this, this.getGoogleMap, props.id);
            }

            return passedGoogleMapCallbackProps;
        }, {});

        if (this.props.instantiateMap) {
            this.props.instantiateMap(this.getGoogleMap, props.id);
        }
    }

    get googleMap() {
        return this.googleMapRef && this.googleMapRef.current;
    }

    componentWillUnmount() {
        if (!this.props.persistentMap) {
            if (this.props.clearMap) {
                this.props.clearMap(this.props.id);
            }
        }
    }

    getGoogleMap() {
        return this.googleMap;
    }

    render() {
        const {
            className,
            mapContainerHeight,
            mapContainerHeightPx,
            containerElement,
            loadingElement,
            mapElement,
            ...props
        } = this.props;

        const actualMapContainerHeight = mapContainerHeight
            ? mapContainerHeight
            : `${mapContainerHeightPx}px`;

        return <ComposedGoogleMap
            googleMapRef={this.googleMapRef}
            {...{
                containerElement: containerElement
                    ? containerElement
                    : <div
                        className="map__container map__container--google"
                        style={{height: actualMapContainerHeight, minHeight: actualMapContainerHeight}}
                    />,
                loadingElement: loadingElement
                    ? loadingElement
                    : <div className={["map__loading"].concat(className).join(" ")} style={{height: "100%"}}>
                        <LoadingSpinner/>
                    </div>,
                mapElement: mapElement
                    ? mapElement
                    : <div className={["map map--google"].concat(className).join(" ")}/>,
                ...props,
                ...this.passedGoogleMapCallbackProps
            }}
        />;
    }
}

GoogleMapComponent.defaultProps = {
    mapContainerHeightPx: MAP_CONTAINER_HEIGHT_PX,
    persistentMap: true
};

GoogleMapComponent.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    mapContainerHeight: PropTypes.string,
    mapContainerHeightPx: PropTypes.number,
    containerElement: PropTypes.node,
    loadingElement: PropTypes.node,
    mapElement: PropTypes.node,
    instantiateMap: PropTypes.func,
    clearMap: PropTypes.func,
    persistentMap: PropTypes.bool.isRequired
};

export default GoogleMapComponent;
