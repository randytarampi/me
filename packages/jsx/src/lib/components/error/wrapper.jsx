import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {mapErrorCodeToErrorContentComponent} from "./content";
import ErrorComponent from "./error";

export const ErrorWrapperComponent = ({children, ...props}) => {
    const errorContentComponent = props.errorContentComponent || props.mapErrorCodeToErrorContentComponent(props.errorCode);

    return <Fragment>
        {
            errorContentComponent
                ? <ErrorComponent {...props} errorContentComponent={errorContentComponent}/>
                : children
        }
    </Fragment>;
};

ErrorWrapperComponent.propTypes = {
    hasError: PropTypes.bool,
    errorContentComponent: PropTypes.node,
    mapErrorCodeToErrorContentComponent: PropTypes.func.isRequired
};

ErrorWrapperComponent.defaultProps = {
    hasError: false,
    mapErrorCodeToErrorContentComponent
};

export default ErrorWrapperComponent;
