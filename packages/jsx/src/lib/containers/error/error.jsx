import {push} from "redux-first-history";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import clearError from "../../actions/error/clearError.js";
import clearErrorTimeoutHandler from "../../actions/error/clearErrorTimeoutHandler.js";
import setErrorTimeout from "../../actions/error/setErrorTimeoutHandler.js";
import {ErrorComponent} from "../../components/error/index.jsx";
import selectors from "../../data/selectors.js";

export const connectError = connect(
    (state, ownProps) => {
        return {
            location: selectors.getLocation(state),
            hasError: ownProps.hasError || selectors.hasError(state),
            error: ownProps.error || selectors.getError(state),
            errorCode: ownProps.errorCode || selectors.getErrorCode(state),
            errorMessage: ownProps.errorMessage || selectors.getErrorMessage(state),
            errorTimeoutHandlerId: selectors.getErrorTimeoutHandlerId(state),
            redirectionLocation: ownProps.redirectionLocation === undefined ? "/" : ownProps.redirectionLocation,
            redirectionTimeout: ownProps.redirectionTimeout === undefined ? 10 : ownProps.redirectionTimeout
        };
    },
    (dispatch, ownProps) => {
        const redirectionLocation = ownProps.redirectionLocation === undefined ? "/" : ownProps.redirectionLocation;
        const redirectionTimeout = ownProps.redirectionTimeout === undefined ? 10 : ownProps.redirectionTimeout;

        return {
            timedRedirect: () => {
                return new Promise(resolve => {
                    const timeoutId = setTimeout(() => {
                        if (window.location && window.location.pathname !== redirectionLocation) {
                            dispatch(clearError());
                            dispatch(push(redirectionLocation));
                        }
                        resolve();
                    }, redirectionTimeout * 1000);

                    dispatch(setErrorTimeout(timeoutId));
                });
            },
            clearErrorTimeoutHandler
        };
    }
);

export const ConnectedError = connectError(ErrorComponent);

ConnectedError.propTypes = {
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number
};

export default ConnectedError;
