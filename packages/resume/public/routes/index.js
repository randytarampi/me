import React from "react"; // eslint-disable-line no-unused-vars
import ResumeContainer from "../../lib/containers/resume";

const routes = [
    {
        component: ResumeContainer,
        path: "/:variant?"
    }
];

export default routes;
