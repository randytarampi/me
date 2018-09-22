import React from "react"; // eslint-disable-line no-unused-vars
import LetterContainer from "../../lib/containers/letter";

const routes = [
    {
        component: LetterContainer,
        path: "/:variant?"
    }
];

export default routes;
