import React from "react";

export const ServerApp = ({printable}) => React.createElement("div", null, printable && printable.basics && printable.basics.name || "");

export default ServerApp;
