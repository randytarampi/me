import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import clearError from "../actions/clearError";
import Error from "../components/error";
import selectors from "../data/selectors";

export const connectError = connect(
    state => {
        return {
            location: selectors.getLocation(state),
            hasError: selectors.hasError(state),
            error: selectors.getError(state),
            errorCode: selectors.getErrorCode(state),
            errorMessage: selectors.getErrorMessage(state)
        };
    },
    (dispatch, ownProps) => {
        return {
            timedRedirect: () => setTimeout(() => {
                if (window.location && window.location.pathname !== ownProps.redirectionLocation) {
                    dispatch(clearError());
                    dispatch(push(ownProps.redirectionLocation));
                }
            }, ownProps.redirectionTimeout * 1000)
        };
    }
);

const ConnectedError = connectError(Error);

ConnectedError.propTypes = {
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number
};

ConnectedError.defaultProps = {
    redirectionLocation: "/",
    redirectionTimeout: 10
};

export default ConnectedError;
