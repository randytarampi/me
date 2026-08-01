import PropTypes from "prop-types";
import React from "react";

import {Router} from "react-router";

export function HistoryRouter({basename, children, history}) {
    const [state, setState] = React.useState({
        action: history.action,
        location: history.location
    });

    React.useLayoutEffect(() => history.listen(setState), [history]);

    return React.createElement(Router, {
        basename,
        location: state.location,
        navigationType: state.action,
        navigator: history
    }, children);
}

HistoryRouter.propTypes = {
    basename: PropTypes.string,
    children: PropTypes.node,
    history: PropTypes.shape({
        action: PropTypes.string,
        listen: PropTypes.func.isRequired,
        location: PropTypes.object
    }).isRequired
};
