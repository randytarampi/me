import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import Error from "../components/error";

const ConnectedError = connect(
    null,
    (dispatch, ownProps) => {
        return {
            timedRedirect: () => setTimeout(() => dispatch(push(ownProps.redirectionLocation)), ownProps.redirectionTimeout * 1000)
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
