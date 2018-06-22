/* global document, window */

export default containerWidth => post => {
	if (post.height && post.width) {
		return containerWidth * post.height / post.width;
	}

	if (post._lastHeight && post._lastWidth) {
		return containerWidth * post._lastHeight / post._lastWidth;
	}

	if (document.getElementById(post.uid)) {
		return document.getElementById(post.uid).clientHeight;
	}

	return window.innerHeight;
};
