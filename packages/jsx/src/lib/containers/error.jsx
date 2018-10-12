import {push} from "connected-react-router";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import clearError from "../actions/clearError";
import clearErrorTimeoutHandler from "../actions/clearErrorTimeoutHandler";
import setErrorTimeout from "../actions/setErrorTimeoutHandler";
import Error from "../components/error";
import selectors from "../data/selectors";

export const connectError = connect(
    state => {
        return {
            location: selectors.getLocation(state),
            hasError: selectors.hasError(state),
            error: selectors.getError(state),
            errorCode: selectors.getErrorCode(state),
            errorMessage: selectors.getErrorMessage(state),
            errorTimeoutHandlerId: selectors.getErrorTimeoutHandlerId(state)
        };
    },
    (dispatch, ownProps) => {
        return {
            timedRedirect: () => {
                return new Promise(resolve => {
                    const timeoutId = setTimeout(() => {
                        if (window.location && window.location.pathname !== ownProps.redirectionLocation) {
                            dispatch(clearError());
                            dispatch(push(ownProps.redirectionLocation));
                        }
                        resolve();
                    }, ownProps.redirectionTimeout * 1000);

                    dispatch(setErrorTimeout(timeoutId));
                });
            },
            clearErrorTimeoutHandler
        };
    }
);

export const ConnectedError = connectError(Error);

ConnectedError.propTypes = {
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number
};

ConnectedError.defaultProps = {
    redirectionLocation: "/",
    redirectionTimeout: 10
};

export default ConnectedError;
