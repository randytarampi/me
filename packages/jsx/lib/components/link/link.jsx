import PropTypes from "prop-types";
import React from "react";

export const Link = props => {
    return <a
        target="__blank"
        rel="noopener noreferrer"
        data-metrics-event-name="anchor"
        data-metrics-type={props.onClick ? "onClick" : props.href ? "href" : undefined}
        data-metrics-name={props.name || props["aria-label"] || props.text}
        data-metrics-label={props["aria-label"] || props.text}
        data-metrics-value={props.onClick ? props.onClick.name : props.href ? props.href : undefined}
        {...props}
        className={["link", props.className].join(" ").trim()}>
        {props.children || props.text}
    </a>;
};

Link.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    "aria-label": PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string
};

export default Link;
