import React from "react";

class Emoji extends React.Component {
	constructor(props, context, updater) {
		super(props, context, updater);

		this.state = {
			components: this.props.components || []
		};
	}
	get components() {
		return this.state.components;
	}
	set components(componentsArray) {
		this.setState({components: componentsArray});
	}
	toString () {
		var components = this.components || [];
		return components.join("");
	}
	render() {
		return <span>
			{this.toString()}
		</span>;
	}
}


export default Emoji;