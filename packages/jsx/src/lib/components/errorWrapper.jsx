import PropTypes from "prop-types";
import React, {Fragment} from "react";
import Error from "./error";

export const ErrorWrapper = ({children, ...props}) => {
    return <Fragment>
        {
            props.hasError
                ? <Error {...props} />
                : children
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
