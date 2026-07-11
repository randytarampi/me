import React from "react";
import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";
import HotApp from "./hotApp.jsx";

// NOTE-RT: `react-dom@19`'s `createRoot(...).render(...)` schedules the initial mount asynchronously (unlike the
// NOTE-RT: removed, synchronous `ReactDOM.render`). Flush it synchronously so consumers (and the entry-point tests)
// NOTE-RT: observe the mounted DOM immediately.
const root = createRoot(document.getElementById("react-root"));

flushSync(() => {
    root.render(<HotApp/>);
});
