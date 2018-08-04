import React from "react";
import Helmet from "react-helmet";
import {renderToString} from "react-dom/server";
import ServerApp from "../public/views/serverApp";

export default resume => renderToString(<ServerApp resume={resume}/>);

export const renderedHelmet = Helmet.renderStatic();
