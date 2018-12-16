import PropTypes from "prop-types";
import {connectError} from ".";
import {ErrorWrapperComponent} from "../../components/error";

export const ConnectedErrorWrapper = connectError(ErrorWrapperComponent);

ConnectedErrorWrapper.propTypes = {
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number
};

ConnectedErrorWrapper.defaultProps = {
    redirectionLocation: "/",
    redirectionTimeout: 10
};

export default ConnectedErrorWrapper;
