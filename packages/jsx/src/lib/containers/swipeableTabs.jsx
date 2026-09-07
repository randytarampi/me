import React, {useEffect} from "react";
import {Tabs} from "react-materialize";
import {connect} from "react-redux";
import {swipeableTabChangeIndexCreator} from "../actions/index.js";

export const ConnectedSwipeableTabs = connect(
    null,
    {
        onChange: swipeableTabChangeIndexCreator
    }
)((props) => {
    useEffect(() => {
        const tabs = document.querySelector(".nav-tabs__swipeable");
        const links = tabs ? [...tabs.querySelectorAll("a")] : [];

        links.forEach(tabLink => {
            tabLink.setAttribute("role", "tab");
            tabLink.setAttribute("aria-selected", String(tabLink.classList.contains("active") || tabLink.parentElement?.classList.contains("active")));
        });
    });

    if (typeof window.M !== "undefined") {
        return <Tabs {...props}/>;
    }

    return null;
});

export default ConnectedSwipeableTabs;
