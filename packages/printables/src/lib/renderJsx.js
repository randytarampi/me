import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {Helmet} from "react-helmet";

export const renderJsx = PrintableComponent => ({pageSize, ...props}) => renderToStaticMarkup(
    React.createElement(PrintableComponent, {
        ...props,
        pageSize: pageSize && pageSize.toLowerCase && pageSize.toLowerCase()
    })
);

export default renderJsx;

export const getRenderedHelmet = () => Helmet.renderStatic();
