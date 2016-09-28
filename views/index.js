import React from "react";
import ReactDOM from "react-dom";
import Title from "./title";
import Placeholder from "./placeholder";

ReactDOM.render(
	<Title />, document.querySelector("title")
);

ReactDOM.render(
	<Placeholder />, document.querySelector("#main")
);
