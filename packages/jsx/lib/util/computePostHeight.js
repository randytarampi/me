export default containerWidth => post => {
    if (post.height && post.width) {
        return containerWidth * post.height / post.width;
    }

    if (document.getElementById(post.uid)) {
        return document.getElementById(post.uid).clientHeight;
    }

    return window.innerHeight;
};
