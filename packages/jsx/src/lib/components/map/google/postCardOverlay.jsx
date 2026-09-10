import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useMap} from "@vis.gl/react-google-maps";

export const derivePostCardTargetWidth = ({viewportWidth, devicePixelRatio = 1}) =>
    Math.round(viewportWidth * 0.75 * devicePixelRatio);

export const derivePostCardDimensions = ({photo, viewportWidth, viewportHeight, contentLength = 0}) => {
    const maxWidth = viewportWidth * 0.75;
    const maxHeight = viewportHeight * 0.75;

    if (photo && photo.width > 0 && photo.height > 0) {
        const scale = Math.min(maxWidth / photo.width, maxHeight / photo.height);
        return {width: Math.round(photo.width * scale), height: Math.round(photo.height * scale)};
    }

    // Text cards have deterministic, content-derived dimensions. This keeps the
    // initial paint and every subsequent render at the same geometry without
    // measuring the DOM.
    const width = Math.round(maxWidth);
    const lines = Math.max(3, Math.ceil(Math.max(1, contentLength) / 42) + 2);
    return {width, height: Math.min(Math.round(maxHeight), lines * 32 + 48)};
};

export const createPostCardOverlayClass = () => {
    const OverlayView = globalThis.google.maps.OverlayView;
    return class PostCardOverlay extends OverlayView {
    constructor({anchor, width, height, isPhoto = false}) {
        super();
        this.anchor = anchor;
        this.width = width;
        this.height = height;
        this.isPhoto = isPhoto;
    }

    onAdd() {
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        // The transition exists for the card open/resize reveal (signed contract). Google Maps
        // calls draw() on every pan/drag frame — a permanent transition there makes the card
        // trail the map. So the transition is enabled only while the card is being revealed or
        // resized, and suppressed while the map is moving.
        this.container.style.transition = "transform 250ms ease-out, width 250ms ease-out, height 250ms ease-out";
        if (this.map) {
            this.bindMapMotionListeners();
        }
        if (this.isPhoto) {
            this.container.style.width = `${this.width}px`;
            this.container.style.height = `${this.height}px`;
        } else {
            this.container.style.maxWidth = "75vw";
            this.container.style.maxHeight = "75vh";
            this.container.style.overflow = "auto";
        }
        const panes = this.getPanes();
        if (panes?.floatPane) {
            panes.floatPane.appendChild(this.container);
        }
    }

    bindMapMotionListeners() {
        this.suppressCardMotion = () => {
            this.container.style.transition = "none";
        };
        this.restoreCardMotion = () => {
            this.container.style.transition = "transform 250ms ease-out, width 250ms ease-out, height 250ms ease-out";
        };
        // `dragstart`/`drag` cover touch/mouse panning; `center_changed` covers programmatic
        // pans and inertia; re-enabling happens when the map goes idle again.
        this.map.addListener("dragstart", this.suppressCardMotion);
        this.map.addListener("drag", this.suppressCardMotion);
        this.map.addListener("center_changed", this.suppressCardMotion);
        this.map.addListener("idle", this.restoreCardMotion);
    }

    draw() {
        const projection = this.getProjection();
        const anchorPosition = this.anchor?.getPosition?.();
        if (!projection || !anchorPosition || !this.container) return;

        const position = projection.fromLatLngToDivPixel(anchorPosition);
        if (!position) return;
        this.container.style.transform = this.isPhoto
            ? `translate(${Math.round(position.x)}px, ${Math.round(position.y)}px) translate(-${this.width / 2}px, -${this.height / 2}px)`
            : `translate(${Math.round(position.x)}px, ${Math.round(position.y)}px) translate(-50%, -50%)`;
    }

    onRemove() {
        if (this.map && this.suppressCardMotion) {
            this.map.removeListener("dragstart", this.suppressCardMotion);
            this.map.removeListener("drag", this.suppressCardMotion);
            this.map.removeListener("center_changed", this.suppressCardMotion);
            this.map.removeListener("idle", this.restoreCardMotion);
        }
        this.suppressCardMotion = null;
        this.restoreCardMotion = null;
        this.container?.remove();
        this.container = null;
    }
    };
};

export const GooglePostCardOverlay = ({anchor, width, height, isPhoto = false, children}) => {
    const map = useMap();
    const overlayRef = useRef(null);
    const [container, setContainer] = useState(null);

    useEffect(() => {
        if (!map || !anchor || !globalThis.google?.maps?.OverlayView) return undefined;
        const overlay = new (createPostCardOverlayClass())({anchor, width, height, isPhoto});
        overlay.map = map;
        overlay.setMap(map);
        overlayRef.current = overlay;
        const interval = window.setInterval(() => {
            if (overlay.container) setContainer(overlay.container);
        }, 10);
        return () => {
            window.clearInterval(interval);
            overlay.setMap(null);
            overlayRef.current = null;
            setContainer(null);
        };
    }, [map, anchor]);

    useEffect(() => {
        if (!overlayRef.current) return;
        overlayRef.current.width = width;
        overlayRef.current.height = height;
        if (overlayRef.current.container) {
            if (overlayRef.current.isPhoto) {
                overlayRef.current.container.style.width = `${width}px`;
                overlayRef.current.container.style.height = `${height}px`;
            }
            overlayRef.current.draw();
        }
    }, [width, height]);

    return container ? createPortal(children, container) : null;
};

GooglePostCardOverlay.propTypes = {
    anchor: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    isPhoto: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default GooglePostCardOverlay;
