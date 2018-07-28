import React from "react";
import Bears from "./bears";
import Code from "./code";
import Intro from "./intro";

const PageContent = () => {
    return <div className="page-content">
        <Intro/>
        <Code/>
        <Bears/>
    </div>;
};

export default PageContent;
