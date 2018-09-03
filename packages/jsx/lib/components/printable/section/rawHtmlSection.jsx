import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const RawHtmlLetterSection = ({printableType, type, rawHtml, hideOnPrint, showOnLetter, showOnA4, showOnLegal, hideOnScreen, verticallyAlignContent, className}) => {
    const classNames = [
        "printable-section",
        "printable-section__raw-html",
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
            <Col className="printable-section__content" dangerouslySetInnerHtml={{__html: rawHtml}}/>
        </Row>
    </section>;
};

RawHtmlLetterSection.propTypes = {
    className: PropTypes.string,
    rawHtml: PropTypes.string.isRequired,
    printableType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    showOnA4: PropTypes.bool,
    showOnLegal: PropTypes.bool,
    showOnLetter: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

RawHtmlLetterSection.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    showOnA4: false,
    showOnLegal: false,
    showOnLetter: false,
    verticallyAlignContent: false
};

export default RawHtmlLetterSection;
