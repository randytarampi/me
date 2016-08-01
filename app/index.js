import React from "react";
import ReactDOM from "react-dom";
import Title from "../views/title";
import Main from "../views/main";

ReactDOM.render(
	<Title />, document.querySelector("title")
);

ReactDOM.render(
	<Main />, document.querySelector("#main")
);
