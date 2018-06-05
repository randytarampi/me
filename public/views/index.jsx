/* global document */

import "jquery";
import "react-materialize";
import React from "react";
import {render} from "react-dom";
import Main from "./main";

render(
	<Main/>, document.querySelector("#main")
);
