import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContentComponent} from "./content/index.jsx";
import ErrorComponent from "./error.jsx";

export const ErrorWrapperComponent = ({children, hasError = false, mapErrorCodeToErrorContentComponent = defaultMapErrorCodeToErrorContentComponent, ...props}) => {
    const errorContentComponent = props.errorContentComponent || mapErrorCodeToErrorContentComponent(props.errorCode);

    return <Fragment>
        {
            errorContentComponent
                ? <ErrorComponent {...props} hasError={hasError} mapErrorCodeToErrorContentComponent={mapErrorCodeToErrorContentComponent} errorContentComponent={errorContentComponent}/>
                : children
        }
    </Fragment>;
};

ErrorWrapperComponent.propTypes = {
    hasError: PropTypes.bool,
    errorCode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    errorContentComponent: PropTypes.node,
    mapErrorCodeToErrorContentComponent: PropTypes.func.isRequired
};


export default ErrorWrapperComponent;
