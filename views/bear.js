import _ from "lodash";
import Emoji from "./emoji";

class Bear extends Emoji {
	constructor(props, context, updater) {
		super(props, context, updater);

		this.state = {
			leftAction: this.props.leftAction || null,
			leftLeaningLeftArm: this.props.leftLeaningLeftArm || null,
			leftEar: this.props.leftEar || "ʕ",
			rightLeaningLeftArm: this.props.rightLeaningLeftArm || null,
			leftEye: this.props.leftEye || "•",
			nose: this.props.nose || "ᴥ",
			rightEye: this.props.rightEye || "•",
			leftLeaningRightArm: this.props.leftLeaningRightArm || null,
			rightEar: this.props.rightEar || "ʔ",
			rightLeaningRightArm: this.props.rightLeaningRightArm || null,
			rightAction: this.props.rightAction || null
		};
	}
	set components(componentsObject) {
		this.setState({
			leftAction: componentsObject.leftAction || this.props.leftAction,
			leftLeaningLeftArm: componentsObject.leftLeaningLeftArm || this.props.leftLeaningLeftArm,
			leftEar: componentsObject.leftEar || this.props.leftEar,
			rightLeaningLeftArm: componentsObject.rightLeaningLeftArm || this.props.rightLeaningLeftArm,
			leftEye: componentsObject.leftEye || this.props.leftEye,
			nose: componentsObject.nose || this.props.nose,
			rightEye: componentsObject.rightEye || this.props.rightEye,
			leftLeaningRightArm: componentsObject.leftLeaningRightArm || this.props.leftLeaningRightArm,
			rightEar: componentsObject.leftLeaningRightArm || this.props.rightEar,
			rightLeaningRightArm: componentsObject.rightLeaningRightArm || this.props.rightLeaningRightArm,
			rightAction: componentsObject.rightAction || this.props.rightAction
		});
	}
	get components () {
		return Bear.assembleComponents(
			this.state.leftAction,
			this.state.leftLeaningLeftArm,
			this.state.leftEar,
			this.state.rightLeaningLeftArm,
			this.state.leftEye,
			this.state.nose,
			this.state.rightEye,
			this.state.leftLeaningRightArm,
			this.state.rightEar,
			this.state.rightLeaningRightArm,
			this.state.rightAction
		);
	}
	static assembleComponents(leftAction, leftLeaningLeftArm, leftEar, rightLeaningLeftArm, leftEye, nose, rightEye, leftLeaningRightArm, rightEar, rightLeaningRightArm, rightAction) {
		return _.chain(arguments)
			.compact()
			.value();
	}
	onClick(component) {
	}
	render() {
		return <div className={["bear", this.toString()].join(" ")}>
			<span className="bear__leftAction" onClick={this.onClick.bind(this, "leftAction")}>{this.state.leftAction}</span>
			<span className="bear__leftLeaningLeftArm" onClick={this.onClick.bind(this, "leftLeaningLeftArm")}>{this.state.leftLeaningLeftArm}</span>
			<span className="bear__leftEar" onClick={this.onClick.bind(this, "leftEar")}>{this.state.leftEar}</span>
			<span className="bear__rightLeaningLeftArm" onClick={this.onClick.bind(this, "rightLeaningLeftArm")}>{this.state.rightLeaningLeftArm}</span>
			<span className="bear__leftEye" onClick={this.onClick.bind(this, "leftEye")}>{this.state.leftEye}</span>
			<span className="bear__nose" onClick={this.onClick.bind(this, "nose")}>{this.state.nose}</span>
			<span className="bear__rightEye" onClick={this.onClick.bind(this, "rightEye")}>{this.state.rightEye}</span>
			<span className="bear__leftLeaningRightArm" onClick={this.onClick.bind(this, "leftLeaningRightArm")}>{this.state.leftLeaningRightArm}</span>
			<span className="bear__rightEar" onClick={this.onClick.bind(this, "rightEar")}>{this.state.rightEar}</span>
			<span className="bear__rightLeaningRightArm" onClick={this.onClick.bind(this, "rightLeaningRightArm")}>{this.state.rightLeaningRightArm}</span>
			<span className="bear__rightAction" onClick={this.onClick.bind(this, "rightAction")}>{this.state.rightAction}</span>
		</div>;
	}
}


export default Bear;

export class HelloBear extends Bear {
	constructor(props, context, updater) {
		super(props, context, updater);

		this.state = {
			leftAction: this.props.leftAction || null,
			leftLeaningLeftArm: this.props.leftLeaningLeftArm || null,
			leftEar: this.props.leftEar || "ʕ",
			rightLeaningLeftArm: this.props.rightLeaningLeftArm || null,
			leftEye: this.props.leftEye || "•",
			nose: this.props.nose || "ᴥ",
			rightEye: this.props.rightEye || "•",
			leftLeaningRightArm: this.props.leftLeaningRightArm || null,
			rightEar: this.props.rightEar || "ʔ",
			rightLeaningRightArm: this.props.rightLeaningRightArm || "ﾉ゛",
			rightAction: this.props.rightAction || null
		};
	}
	onClick(component) {
		switch (component) {
			case "nose":
				var pokes = this.state.pokes || 0;
				pokes += 1;
				var newState = {
					pokes: pokes
				};
				switch (pokes) {
					case 1:
						newState.rightLeaningRightArm = null;
						break;
					case 2:
						newState.leftEye = "ಠಿ";
						newState.rightEye = "ಠ";
						break;
					case 3:
						newState.leftEye = "ಠ";
						newState.rightEye = "ಠ";
						break;
					case 5:
						newState.leftEye = "◕";
						newState.rightEye = "◕";
						break;
					case 8:
						newState.leftEye = "°";
						newState.rightEye = "°";
						break;
					case 13:
						newState.rightLeaningLeftArm = "つ";
						newState.leftEye = "ಠ";
						newState.rightEye = "ಠ";
						newState.rightLeaningRightArm = "つ";
						newState.rightAction = " ︵ ┻━┻";
						break;
					case 21:
						newState.rightLeaningLeftArm = null;
						newState.leftEye = "–";
						newState.rightEye = "–";
						newState.rightLeaningRightArm = null;
						newState.rightAction = null;
						break;
					case 34:
						newState.leftEye = " ͡°";
						newState.rightEye = " ͡°";
						break;
					case 35:
						newState.rightLeaningLeftArm = "つ";
						newState.rightLeaningRightArm = "つ";
						newState.rightAction = " 📨";
						window.open("mailto:rt@randytarampi.ca?subject=ʕ•ᴥ•ʔﾉ゛&body=I got to the end and couldn\'t stop clicking!");
						break;
					case 36:
						pokes = 34;
						break;
				}
				this.setState(newState);
		}
	}
}