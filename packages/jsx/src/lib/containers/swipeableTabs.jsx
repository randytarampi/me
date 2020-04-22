import React from "react";
import {Tabs} from "react-materialize";
import {connect} from "react-redux";
import {swipeableTabChangeIndexCreator} from "../actions";

export const ConnectedSwipeableTabs = connect(
    null,
    {
        onChange: swipeableTabChangeIndexCreator
    }
)((props) => {
    if (typeof window.M !== "undefined") {
        return <Tabs {...props}/>;
    }

    return null;
});

export default ConnectedSwipeableTabs;
