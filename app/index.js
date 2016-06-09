import React from "react";
import ReactDOM from "react-dom";
import Title from "../views/title";
import Placeholder from "../views/placeholder";

ReactDOM.render(
	<Title />, document.querySelector("title")
);

ReactDOM.render(
	<Placeholder />, document.querySelector("#main")
);
