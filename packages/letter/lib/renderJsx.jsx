import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import Helmet from "react-helmet";
import ServerApp from "../public/views/serverApp";

export default ({pageSize, ...props}) => renderToStaticMarkup(<ServerApp {...props}
                                                                         pageSize={pageSize && pageSize.toLowerCase()}/>);

export const getRenderedHelmet = () => Helmet.renderStatic();
