import React, {useEffect} from "react";
import {Tabs} from "react-materialize";
import {connect} from "react-redux";
import {swipeableTabChangeIndexCreator, swipeableTabsReady} from "../actions/index.js";

export const ConnectedSwipeableTabs = connect(
    null,
    {
        onChange: swipeableTabChangeIndexCreator,
        onTabsReady: swipeableTabsReady
    }
)((props) => {
    useEffect(() => {
        const tabs = document.querySelector(".nav-tabs__swipeable");
        if (!tabs || typeof window.M === "undefined" || !window.M.Tabs.getInstance(tabs)) return;
        const links = tabs ? [...tabs.querySelectorAll("a")] : [];

        links.forEach(tabLink => {
            tabLink.setAttribute("role", "tab");
            tabLink.setAttribute("aria-selected", String(tabLink.classList.contains("active") || tabLink.parentElement?.classList.contains("active")));
        });
        props.onTabsReady();
    }, [props.onTabsReady]);

    if (typeof window.M !== "undefined") {
        return <Tabs {...props}/>;
    }

    return null;
});

export default ConnectedSwipeableTabs;
