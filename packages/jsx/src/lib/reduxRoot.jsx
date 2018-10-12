import PropTypes from "prop-types";
import React from "react";
import {Provider} from "react-redux";

export const ReduxRoot = props =>
    <Provider {...props} />;

ReduxRoot.propTypes = {
    store: PropTypes.object.isRequired
};

export default ReduxRoot;
