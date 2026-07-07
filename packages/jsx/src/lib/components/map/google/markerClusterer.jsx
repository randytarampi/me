/* global google */
// NOTE-RT: `@googlemaps/markerclusterer` ships a UMD build (`main: "dist/index.umd.js"`) whose
// export assignments aren't statically analyzable by Node's own CJS-to-ESM interop (`cjs-module-
// lexer`), so a named import (`import {MarkerClusterer} from "..."`) fails with "does not provide
// an export named 'MarkerClusterer'" once this package's own build output is genuine ESM loaded
// via Node's native `require()`/`import()` - even though the same named destructure works fine
// under a plain CJS `require()` of this same dependency. A default import always maps to the
// whole `module.exports` object under this interop, regardless of what the lexer could detect.
import MarkerClustererModule from "@googlemaps/markerclusterer";
import PropTypes from "prop-types";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useMap} from "@vis.gl/react-google-maps";
import {GoogleMapMarkerClustererStyles} from "./styles.js";

const {MarkerClusterer} = MarkerClustererModule;

// NOTE-RT: faithfully reimplements the classic `MarkerClustererPlus`/`react-google-maps`
// clusterer icon-selection algorithm (bucket the cluster's marker count on a log scale, clamped
// to the available `styles`), since `@googlemaps/markerclusterer` (unlike the old addon) has no
// built-in concept of "styles" - it expects a `renderer` function instead.
export const buildGoogleMapMarkerClustererStyleIndexForCount = (count, styles) => Math.min(
    styles.length - 1,
    Math.max(0, Math.floor(Math.log(count) / Math.log(10)))
);

export const buildGoogleMapMarkerClustererRenderer = ({styles = GoogleMapMarkerClustererStyles} = {}) => ({
    render: ({count, position}) => {
        const style = styles[buildGoogleMapMarkerClustererStyleIndexForCount(count, styles)];

        return new google.maps.Marker({
            position,
            icon: {
                url: style.url,
                scaledSize: new google.maps.Size(style.width, style.height)
            },
            label: {
                text: String(count),
                color: style.textColor,
                fontSize: `${style.textSize}px`,
                fontFamily: style.fontFamily
            },
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count
        });
    }
});

// NOTE-RT: this component is rendered as (an ancestor of) the individual `<Marker>` children it's
// meant to cluster; it clones each child, injecting a `setMarkerRef` callback the child is
// expected to attach as its underlying `google.maps.Marker`'s `ref`, matching the documented
// `@vis.gl/react-google-maps` marker-clustering pattern (a single `MarkerClusterer` instance,
// kept in sync with the currently-mounted marker instances via `useEffect`).
// NOTE-RT: any remaining props (e.g. the legacy `enableRetinaIcons` flag) are accepted for
// backwards-compatibility but intentionally not forwarded anywhere - `@googlemaps/markerclusterer`
// has no equivalent concept, and the custom `renderer` above always builds a single, non-retina
// icon per bucket (matching this library's actual, non-`@2x`, marker-clusterer style assets).
// NOTE-RT: React 19 removed `defaultProps` support for function components entirely (silently
// ignored), so defaults are declared as ES6 default parameter values instead.
export const GoogleMapMarkerClustererComponent = ({styles = GoogleMapMarkerClustererStyles, maxZoom = 15, children}) => {
    const map = useMap();
    const [markers, setMarkers] = useState({});
    const renderer = useMemo(() => buildGoogleMapMarkerClustererRenderer({styles}), [styles]);
    const clusterer = useRef(null);

    useEffect(() => {
        if (!map) {
            return undefined;
        }

        clusterer.current = new MarkerClusterer({map, renderer, algorithmOptions: {maxZoom}});

        return () => {
            if (clusterer.current) {
                clusterer.current.setMap(null);
                clusterer.current = null;
            }
        };
    }, [map, renderer, maxZoom]);

    useEffect(() => {
        if (!clusterer.current) {
            return;
        }

        clusterer.current.clearMarkers();
        clusterer.current.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = useCallback((marker, key) => {
        setMarkers(currentMarkers => {
            if ((marker && currentMarkers[key]) || (!marker && !currentMarkers[key])) {
                return currentMarkers;
            }

            if (marker) {
                return {...currentMarkers, [key]: marker};
            }

            const remainingMarkers = {...currentMarkers};

            delete remainingMarkers[key];

            return remainingMarkers;
        });
    }, []);

    return React.Children.map(children, child => child
        ? React.cloneElement(child, {setMarkerRef})
        : child);
};

GoogleMapMarkerClustererComponent.propTypes = {
    styles: PropTypes.arrayOf(PropTypes.object),
    maxZoom: PropTypes.number
};

export default GoogleMapMarkerClustererComponent;
