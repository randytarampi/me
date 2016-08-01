import React from "react";

class Link extends React.Component {
	constructor(props, context, updater) {
		super(props, context, updater);
	}
	toString () {
		return this.props.href;
	}
	render() {
		return <a className="link" target="__blank" {...this.props}>{this.props.text}</a>;
	}
}

export default Link;

export class Email extends Link {
	constructor(props, context, updater) {
		super(props, context, updater);
	}
	static get defaultProps () {
		return {
			href: "mailto:randytarampi@randytarampi.ca",
			text: "Email"
		};
	}
}

export class LinkedIn extends Link {
	constructor(props, context, updater) {
		super(props, context, updater);
	}
	static get defaultProps () {
		return {
			href: "https://www.linkedin.com/in/randytarampi",
			text: "LinkedIn"
		};
	}
}

export class GitHub extends Link {
	constructor(props, context, updater) {
		super(props, context, updater);
	}
	static get defaultProps () {
		return {
			href: "https://github.com/randytarampi",
			text: "GitHub"
		};
	}
}

export class Flickr extends Link {
	constructor(props, context, updater) {
		super(props, context, updater);
	}
	static get defaultProps () {
		return {
			href: "https://www.flickr.com/randytarampi",
			text: "Flickr"
		};
	}
}
