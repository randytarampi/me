import React from "react";
import Bears from "./bears";
import Intro from "./intro";
import Works from "./works";

const PageContent = () => {
    return <div className="page-content">
        <Intro/>
        <Works/>
        <Bears/>
    </div>;
};

export default PageContent;
