import {logger} from "@randy.tarampi/browser-logger";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Col, Row} from "react-materialize";
import {mapErrorCodeToErrorContentComponent} from "./content";

export class ErrorComponent extends PureComponent {
    componentDidMount() {
        if ([404, "ENOTFOUND"].includes(this.props.errorCode) && !this.props.errorTimeoutHandlerId) {
            this.props.timedRedirect();
        }
    }

    render() {
        const {mapErrorCodeToErrorContentComponent, errorContentComponent, ...props} = this.props;
        const ErrorContentComponent = errorContentComponent || mapErrorCodeToErrorContentComponent(props.errorCode);

        if (!ErrorContentComponent) {
            logger.error("`ErrorContentComponent` is %s for props %j, just returning `null`", ErrorContentComponent, props);

            return null;
        }

        return <div className="error">
            <Row>
                <Col>
                    <ErrorContentComponent {...props}/>
                </Col>
            </Row>
        </div>;
    }

    componentWillUnmount() {
        this.props.clearErrorTimeoutHandler();
    }
}

ErrorComponent.propTypes = {
    match: PropTypes.object,
    error: PropTypes.object,
    errorCode: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    mapErrorCodeToErrorContentComponent: PropTypes.func.isRequired,
    errorContentComponent: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string
    ]),
    errorMessage: PropTypes.string,
    errorTimeoutHandlerId: PropTypes.number,
    location: PropTypes.object.isRequired,
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number.isRequired,
    timedRedirect: PropTypes.func.isRequired,
    clearErrorTimeoutHandler: PropTypes.func.isRequired
};

ErrorComponent.defaultProps = {
    mapErrorCodeToErrorContentComponent
};

export default ErrorComponent;
