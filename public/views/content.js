import React from "react";
import {Content} from "react-mdl";
import Intro from "./intro";
import Code from "./code";
import Bears from "./bears";

class PageContent extends React.Component {
	render() {
		return <Content className="content">
			<Intro />
			<Code />
			<Bears />
		</Content>;
	}
}

export default PageContent;