export const WINDOW_LARGE_BREAKPOINT = 992;
export const WINDOW_LARGE_PHOTO_SCALE = 8 / 12;

export const computePostHeight = containerWidth => (post, cachedPostHeight) => {
    if (post.height && post.width) {
        let scaledHeight = containerWidth * (post.height / post.width);

        if (window.innerWidth >= WINDOW_LARGE_BREAKPOINT) {
            scaledHeight = scaledHeight * WINDOW_LARGE_PHOTO_SCALE;
        }

        return Math.round(scaledHeight);
    }

    if (typeof document !== "undefined" && document.getElementById(post.uid)) {
        return document.getElementById(post.uid).clientHeight;
    }

    if (cachedPostHeight) {
        return cachedPostHeight;
    }

    return typeof window !== "undefined" && window.innerHeight || 1000;
};

export default computePostHeight;
