import React from "react";
import ReactDOM from "react-dom";
import Main from "../views/main";
import Title from "../views/title";

ReactDOM.render(
	<Title />, document.querySelector("title")
);

ReactDOM.render(
	<Main />, document.querySelector("#main")
);
