/* global document */

import "jquery";
import React from "react";
import {render} from "react-dom";
import "react-materialize";
import Main from "./main";

render(
    <Main/>, document.querySelector("#react-root")
);
