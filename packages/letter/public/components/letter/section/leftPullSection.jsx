import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const LeftPullSection = ({type, hideOnPrint, showOnLetter, showOnA4, showOnLegal, hideOnScreen, verticallyAlignContent, className, children, sideContent}) => {
    const classNames = [
        "letter-section",
        "letter-section--pull",
        "letter-section--pull-left",
        "letter-" + type
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
            <Col m={9} className="letter-section__content">
                {children}
            </Col>
            <aside className="col m3 letter-section__footer hide-on-small-only">
                {sideContent}
            </aside>
        </Row>
    </section>;
};

LeftPullSection.propTypes = {
    className: PropTypes.string,
    sideContent: PropTypes.node,
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    showOnA4: PropTypes.bool,
    showOnLegal: PropTypes.bool,
    showOnLetter: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

LeftPullSection.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    showOnA4: false,
    showOnLegal: false,
    showOnLetter: false,
    verticallyAlignContent: false
};

export default LeftPullSection;
