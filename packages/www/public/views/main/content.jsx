import React, {Fragment} from "react";
import Bears from "./bears";
import Intro from "./intro";
import Works from "./works";

const PageContent = () => {
    return <Fragment>
        <Intro/>
        <Works/>
        <Bears/>
    </Fragment>;
};

export default PageContent;
