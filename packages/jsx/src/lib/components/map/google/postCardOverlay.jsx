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
    constructor({anchor, width, height}) {
        super();
        this.anchor = anchor;
        this.width = width;
        this.height = height;
    }

    onAdd() {
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.width = `${this.width}px`;
        this.container.style.height = `${this.height}px`;
        const panes = this.getPanes();
        if (panes?.floatPane) {
            panes.floatPane.appendChild(this.container);
        }
    }

    draw() {
        const projection = this.getProjection();
        const anchorPosition = this.anchor?.getPosition?.();
        if (!projection || !anchorPosition || !this.container) return;

        const position = projection.fromLatLngToDivPixel(anchorPosition);
        if (!position) return;
        this.container.style.transform = `translate(${Math.round(position.x)}px, ${Math.round(position.y)}px) translate(-${this.width / 2}px, -${this.height / 2}px)`;
    }

    onRemove() {
        this.container?.remove();
        this.container = null;
    }
    };
};

export const GooglePostCardOverlay = ({anchor, width, height, children}) => {
    const map = useMap();
    const overlayRef = useRef(null);
    const [container, setContainer] = useState(null);

    useEffect(() => {
        if (!map || !anchor || !globalThis.google?.maps?.OverlayView) return undefined;
        const overlay = new (createPostCardOverlayClass())({anchor, width, height});
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
            overlayRef.current.container.style.width = `${width}px`;
            overlayRef.current.container.style.height = `${height}px`;
            overlayRef.current.draw();
        }
    }, [width, height]);

    return container ? createPortal(children, container) : null;
};

GooglePostCardOverlay.propTypes = {
    anchor: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
};

export default GooglePostCardOverlay;
