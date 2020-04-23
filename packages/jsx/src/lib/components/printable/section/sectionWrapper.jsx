import PropTypes from "prop-types";
import React from "react";
import {Row} from "react-materialize";

export const SectionWrapper = ({printableType, type, hideOnPrint, showOnLetter, showOnA4, showOnLegal, hideOnScreen, verticallyAlignContent, className, children}) => {
    const classNames = [
        "printable-section",
        "printable-" + type,
        `${printableType}-${type}`
    ];

    if (hideOnScreen) {
        classNames.push("hide-on-screen");
    }

    if (showOnA4) {
        classNames.push("show-on-a4");
    }

    if (showOnLetter) {
        classNames.push("show-on-letter");
    }

    if (showOnLegal) {
        classNames.push("show-on-legal");
    }

    if (hideOnPrint && !showOnA4 && !showOnLetter && !showOnLegal) {
        classNames.push("hide-on-print");
    }

    return <section id={type} className={classNames.concat(className).join(" ").trim()}>
        <Row className={verticallyAlignContent ? "valign-wrapper" : null}>
            {children}
        </Row>
    </section>;
};

SectionWrapper.propTypes = {
    className: PropTypes.string,
    printableType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    showOnA4: PropTypes.bool,
    showOnLegal: PropTypes.bool,
    showOnLetter: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

SectionWrapper.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    showOnA4: false,
    showOnLegal: false,
    showOnLetter: false,
    verticallyAlignContent: false
};

export default SectionWrapper;
