import {Navigation} from "react-mdl";
import {Email, GitHub, LinkedIn, Flickr} from "../components/link";

export default () =>
	<Navigation className="navigation">
		<Email className="mdl-navigation__link"/>
		<GitHub className="mdl-navigation__link"/>
		<LinkedIn className="mdl-navigation__link"/>
		<Flickr className="mdl-navigation__link"/>
	</Navigation>;