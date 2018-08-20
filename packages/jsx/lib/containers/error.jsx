import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import clearError from "../actions/clearError";
import Error from "../components/error";
import selectors from "../data/selectors";

const ConnectedError = connect(
    state => {
        return {
            error: selectors.getError(state),
            errorCode: selectors.getErrorCode(state),
            errorMessage: selectors.getErrorMessage(state)
        };
    },
    (dispatch, ownProps) => {
        return {
            timedRedirect: () => setTimeout(() => {
                dispatch(clearError());
                dispatch(push(ownProps.redirectionLocation));
            }, ownProps.redirectionTimeout * 1000)
        };
    }
)(Error);

ConnectedError.propTypes = {
    location: PropTypes.object.isRequired,
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number
};

ConnectedError.defaultProps = {
    redirectionLocation: "/",
    redirectionTimeout: 10
};

export default ConnectedError;
