import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {APIProvider, Map, useApiLoadingStatus, useMap} from "@vis.gl/react-google-maps";
import {LoadingSpinner} from "../../loadingSpinner.jsx";
import {MAP_CONTAINER_HEIGHT_PX} from "../util.js";
import {GoogleMapStyles} from "./styles.js";

export const GOOGLE_MAPS_API_KEY = __GCP_API_KEY__;
export const MAP_API_LIBRARIES = ["geometry", "drawing", "places"];
// NOTE-RT: kept around for reference/backwards-compatibility - `@vis.gl/react-google-maps`'s
// `<APIProvider>` (below) loads the actual script itself, using `GOOGLE_MAPS_API_KEY`/`MAP_API_LIBRARIES`.
export const MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=${MAP_API_LIBRARIES.join(",")}`;

export * from "./markerClusterer.jsx";

// NOTE-RT: a small bridge rendered *inside* `<Map>` (and therefore inside the `<APIProvider>`
// context) purely so it can call the `useMap()` hook - `GoogleMapComponent` below is a class
// component (needed for its existing constructor-time `instantiateMap` call/`googleMapCallbacks`
// binding contract) and hooks can't be called there directly.
const GoogleMapInstanceBridge = ({googleMapRef}) => {
    const map = useMap();

    React.useEffect(() => {
        if (!map) {
            return;
        }

        if (typeof googleMapRef === "function") {
            googleMapRef(map);
        } else if (googleMapRef) {
            googleMapRef.current = map;
        }
    }, [map, googleMapRef]);

    return null;
};

GoogleMapInstanceBridge.propTypes = {
    googleMapRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.object})
    ])
};

// NOTE-RT: mirrors `withScriptjs`'s old `loadingElement` behaviour - render it until the Maps
// JavaScript API script has actually finished loading, then swap in the real `<Map>`.
const GoogleMapLoadingGate = ({loadingElement, googleMapRef, children, ...props}) => {
    const loadingStatus = useApiLoadingStatus();

    if (loadingStatus !== "LOADED") {
        return loadingElement || null;
    }

    return <Map {...props}>
        <GoogleMapInstanceBridge googleMapRef={googleMapRef}/>
        {children}
    </Map>;
};

GoogleMapLoadingGate.propTypes = {
    loadingElement: PropTypes.node,
    googleMapRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.object})
    ])
};

// NOTE-RT: React 19 removed `defaultProps` support for function components entirely (silently
// ignored - class components are unaffected, see `GoogleMapComponent`'s static defaultProps), so
// these defaults are hoisted module-level constants used as ES6 default parameter values instead.
const DEFAULT_GOOGLE_MAP_CENTER = {
    lat: 52.5018708,
    lng: 13.3655289
};
const DEFAULT_GOOGLE_MAP_STREET_VIEW_CONTROL_OPTIONS = {
    position: 6 // NOTE-RT: google.maps.ControlPosition.BOTTOM_LEFT
};
const DEFAULT_GOOGLE_MAP_ZOOM_CONTROL_OPTIONS = {
    position: 6 // NOTE-RT: google.maps.ControlPosition.BOTTOM_LEFT
};

export const ComposedGoogleMap = ({
    googleMapRef,
    loadingElement,
    defaultZoom = 10,
    defaultCenter = DEFAULT_GOOGLE_MAP_CENTER,
    // defaultMapTypeId = "terrain", // NOTE-RT: google.maps.MapTypeId.TERRAIN
    minZoom = 2,
    styles = GoogleMapStyles,
    streetViewControl = true,
    streetViewControlOptions = DEFAULT_GOOGLE_MAP_STREET_VIEW_CONTROL_OPTIONS,
    zoomControl = true,
    zoomControlOptions = DEFAULT_GOOGLE_MAP_ZOOM_CONTROL_OPTIONS,
    gestureHandling = "greedy",
    ...props
}) => <APIProvider
    apiKey={GOOGLE_MAPS_API_KEY}
    libraries={MAP_API_LIBRARIES}
>
    <GoogleMapLoadingGate
        googleMapRef={googleMapRef}
        loadingElement={loadingElement}
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        minZoom={minZoom}
        styles={styles}
        streetViewControl={streetViewControl}
        streetViewControlOptions={streetViewControlOptions}
        zoomControl={zoomControl}
        zoomControlOptions={zoomControlOptions}
        gestureHandling={gestureHandling}
        {...props}
    />
</APIProvider>;

ComposedGoogleMap.propTypes = {
    googleMapRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.object})
    ]),
    loadingElement: PropTypes.node,
    defaultZoom: PropTypes.number,
    defaultCenter: PropTypes.object,
    minZoom: PropTypes.number,
    styles: PropTypes.array,
    streetViewControl: PropTypes.bool,
    streetViewControlOptions: PropTypes.object,
    zoomControl: PropTypes.bool,
    zoomControlOptions: PropTypes.object,
    gestureHandling: PropTypes.string
};

// NOTE-RT: maps this component's (legacy `react-google-maps`-shaped) callback prop names onto
// `@vis.gl/react-google-maps`'s `<Map>` event prop names, where they differ. `onResize` has no
// direct one-to-one equivalent in the new library (`resize` is a manually-triggered event, not
// something the map fires on its own) and is intentionally dropped.
const googleMapCallbackPropNameTranslations = {
    onDblClick: "onDblclick",
    onDragEnd: "onDragend",
    onDragStart: "onDragstart",
    onMouseMove: "onMousemove",
    onMouseOut: "onMouseout",
    onMouseOver: "onMouseover",
    onRightClick: "onContextmenu"
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
    "onTiltChanged",
    "onZoomChanged"
];

export class GoogleMapComponent extends PureComponent {
    static defaultProps = {
        mapContainerHeightPx: MAP_CONTAINER_HEIGHT_PX,
        persistentMap: true
    };

    constructor(passedProps) {
        const {googleMapRef, ...props} = passedProps;
        const propsKeys = Object.keys(props);

        super(passedProps);

        this.googleMapRef = googleMapRef || React.createRef();
        this.getGoogleMap = this.getGoogleMap.bind(this);
        this.passedGoogleMapCallbackProps = propsKeys.reduce((passedGoogleMapCallbackProps, propKey) => {
            if (googleMapCallbacks.includes(propKey)) {
                const translatedPropKey = googleMapCallbackPropNameTranslations[propKey] || propKey;

                passedGoogleMapCallbackProps[translatedPropKey] = props[propKey].bind(this, this.getGoogleMap, props.id);
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
            children,
            ...props
        } = this.props;

        const actualMapContainerHeight = mapContainerHeight
            ? mapContainerHeight
            : `${mapContainerHeightPx}px`;

        const map = <ComposedGoogleMap
            googleMapRef={this.googleMapRef}
            className={["map", "map--google"].concat(className || []).join(" ")}
            style={{height: "100%"}}
            {...{
                loadingElement: loadingElement
                    ? loadingElement
                    : <div className={["map__loading"].concat(className || []).join(" ")} style={{height: "100%"}}>
                        <LoadingSpinner/>
                    </div>,
                ...props,
                ...this.passedGoogleMapCallbackProps
            }}
        >
            {children}
        </ComposedGoogleMap>;

        return containerElement
            ? React.cloneElement(containerElement, {}, map)
            : <div
                className="map__container map__container--google"
                style={{height: actualMapContainerHeight, minHeight: actualMapContainerHeight}}
            >
                {map}
            </div>;
    }
}


GoogleMapComponent.propTypes = {
    id: PropTypes.string.isRequired,
    googleMapRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.object})
    ]),
    className: PropTypes.string,
    mapContainerHeight: PropTypes.string,
    mapContainerHeightPx: PropTypes.number,
    containerElement: PropTypes.node,
    loadingElement: PropTypes.node,
    instantiateMap: PropTypes.func,
    clearMap: PropTypes.func,
    persistentMap: PropTypes.bool.isRequired
};

export default GoogleMapComponent;
