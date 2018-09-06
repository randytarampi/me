import React, {Component} from "react";
import Content from "./content";
import {logger} from "@randy.tarampi/jsx";

class Main extends Component {
    componentDidMount() {
        logger.info(`My blog is a lot more fun (content and code wise), so check that out:\n\t\t${window.location.origin}${__POSTS_APP_URL__}`);
    }

    render() {
        return <Content/>;
    }
}

export default Main;
