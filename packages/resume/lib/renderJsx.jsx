import React from "react";
import {renderToString} from "react-dom/server";
import ServerApp from "../public/views/serverApp";

export default resume => renderToString(<ServerApp resume={resume}/>);

