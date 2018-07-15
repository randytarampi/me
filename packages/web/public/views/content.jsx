import React from "react";
import Intro from "./intro";
import Code from "./code";
import Bears from "./bears";

const PageContent = () => {
	return <div className="page-content">
		<Intro/>
		<Code/>
		<Bears/>
	</div>;
};

export default PageContent;
