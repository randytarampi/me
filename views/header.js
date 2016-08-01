import {Header} from "react-mdl";
import Navigation from './navigation';

export default ({name}) =>
	<Header className="header" waterfall hideTop scroll title={<strong>{document.location.hostname.replace(/www\./, "")}</strong>}>
		<Navigation className="header__navigation"/>
	</Header>;