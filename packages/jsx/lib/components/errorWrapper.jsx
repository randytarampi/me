import PropTypes from "prop-types";
import React, {Fragment} from "react";
import Error from "./error";

const ErrorWrapper = props => {
    return <Fragment>
        {
            props.hasError
                ? <Error {...props} />
                : props.children
        }
    </Fragment>;
};

ErrorWrapper.propTypes = {
    hasError: PropTypes.bool
};

ErrorWrapper.defaultProps = {
    hasError: false
};

export default ErrorWrapper;
