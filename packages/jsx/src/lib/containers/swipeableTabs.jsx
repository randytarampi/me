import {Tabs} from "react-materialize";
import {connect} from "react-redux";
import {swipeableTabChangeIndexCreator} from "../actions";

export const ConnectedSwipeableTabs = connect(
    null,
    {
        onChange: swipeableTabChangeIndexCreator
    }
)(Tabs);

export default ConnectedSwipeableTabs;
