import React, {Component, Fragment} from "react";
import {logger} from "@randy.tarampi/jsx";
import Intro from "./intro";
import Works from "./works";
import Bears from "./bears";

export class Main extends Component {
    componentDidMount() {
        logger.info(`My blog is a lot more fun (content and code wise), so check that out:\n\t\t${window.location.origin}${__POSTS_APP_URL__}`);
    }

    render() {
        return <Fragment>
            <Intro/>
            <Works/>
            <Bears/>
        </Fragment>;
    }
}

export default Main;
