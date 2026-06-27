// @ts-check
import {useCallback, useEffect, useRef, useState} from "react";

/** @returns {{width: number, height: number, ref: (node: *) => void}} A ref callback and measured dimensions. */
export const useMeasure = () => {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });
    const resizeObserverRef = useRef(null);

    const disconnectResizeObserver = useCallback(() => {
        if (resizeObserverRef.current) {
            resizeObserverRef.current.disconnect();
            resizeObserverRef.current = null;
        }
    }, []);

    const ref = useCallback(node => {
        disconnectResizeObserver();

        if (!node) {
            return;
        }

        const updateDimensions = ({width, height}) => {
            setDimensions(previousDimensions => {
                if (previousDimensions.width === width && previousDimensions.height === height) {
                    return previousDimensions;
                }

                return {
                    width,
                    height
                };
            });
        };

        updateDimensions(node.getBoundingClientRect());

        const ResizeObserverClass = typeof window !== "undefined" ? window.ResizeObserver : undefined;

        if (ResizeObserverClass) {
            resizeObserverRef.current = new ResizeObserverClass(entries => {
                const [entry] = entries;

                if (entry) {
                    updateDimensions(entry.contentRect);
                }
            });

            resizeObserverRef.current.observe(node);
        }
    }, [disconnectResizeObserver]);

    useEffect(() => disconnectResizeObserver, [disconnectResizeObserver]);

    return {
        ...dimensions,
        ref
    };
};

export default useMeasure;
