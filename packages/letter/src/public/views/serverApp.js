import React from "react";

export const ServerApp = ({printable}) => React.createElement("div", null,
    printable && printable.sender && printable.sender.name || "",
    printable && printable.recipient && printable.recipient.name || ""
);

export default ServerApp;
