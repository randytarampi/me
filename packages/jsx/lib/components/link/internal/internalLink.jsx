import PropTypes from "prop-types";
import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import Link from "../link";

const InternalLinkInternal = ({serviceName, serviceType, className, ...props}) => {
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
    serviceName: PropTypes.string.isRequired,
    serviceType: PropTypes.string.isRequired
};

export const InternalLink = connect(
    null,
    (dispatch, ownProps) => {
        return {
            onClick: () => dispatch(push(ownProps.href))
        };
    }
)(InternalLinkInternal);

export default InternalLink;
