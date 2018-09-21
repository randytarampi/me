import PropTypes from "prop-types";
import ErrorWrapper from "../components/errorWrapper";
import {connectError} from "./error";

export const ConnectedErrorWrapper = connectError(ErrorWrapper);

ConnectedErrorWrapper.propTypes = {
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number
};

ConnectedErrorWrapper.defaultProps = {
    redirectionLocation: "/",
    redirectionTimeout: 10
};

export default ConnectedErrorWrapper;
