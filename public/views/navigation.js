import {Navigation} from "react-mdl";
import {Email, Code, Words, Photos} from "../components/link";

export default () =>
	<Navigation className="navigation">
		<Email className="mdl-navigation__link"/>
		<Code className="mdl-navigation__link"/>
		<Photos className="mdl-navigation__link"/>
		<Words className="mdl-navigation__link"/>
	</Navigation>;