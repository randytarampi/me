import {push} from "connected-react-router/immutable";
import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import Link from "../link";

const InternalLinkInternal = ({serviceName, serviceType, className, ...props}) => { // eslint-disable-line no-unused-vars
    return <Link
        target="_self"
        text={serviceName}
        {...props}
        className={[`link--${serviceType}`, className].join(" ").trim()}
    />;
};

InternalLinkInternal.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string.isRequired,
    serviceName: PropTypes.string,
    serviceType: PropTypes.string.isRequired
};

InternalLinkInternal.defaultProps = {
    serviceType: "internal"
};

export const InternalLink = connect(
    null,
    (dispatch, {onClick, href}) => {
        return {
            onClick: event => {
                event.preventDefault();
                dispatch(push(href));

                if (onClick) {
                    onClick(event);
                }
            }
        };
    }
)(InternalLinkInternal);

InternalLink.propTypes = {
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default InternalLink;
