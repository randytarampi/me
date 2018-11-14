export const computePostHeight = containerWidth => post => {
    if (post.height && post.width) {
        return containerWidth * post.height / post.width;
    }

    if (typeof document !== "undefined" && document.getElementById(post.uid)) {
        return document.getElementById(post.uid).clientHeight;
    }

    return typeof window !== "undefined" && window.innerHeight || 1000;
};

export default computePostHeight;
