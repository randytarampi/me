import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const RightDescriptionSection = ({printableType, type, label, labelNode, description, descriptionNode, hideOnPrint, showOnLetter, showOnA4, showOnLegal, hideOnScreen, verticallyAlignContent, className, children}) => {
    const classNames = [
        "printable-section",
        "printable-section--description",
        "printable-section--description-right",
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
            <Col m={9} className="printable-section__content">
                {children}
            </Col>
            <aside className="col m3 printable-section__header hide-on-small-only">
                {
                    labelNode
                        ? labelNode
                        : label
                        ? <h3 className="printable-section__label"><span className="text">{label}</span></h3>
                        : null
                }
                {
                    descriptionNode || description
                        ? <Row className="hide-on-small-only">
                            <Col s={9}>
                                {
                                    descriptionNode
                                        ? <div className="printable-section__description">{descriptionNode}</div>
                                        : description
                                        ? <p className="printable-section__description"><span
                                            className="text">{description}</span></p>
                                        : null
                                }
                            </Col>
                        </Row>
                        : null
                }
            </aside>
        </Row>
    </section>;
};

RightDescriptionSection.propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    labelNode: PropTypes.node,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    descriptionNode: PropTypes.node,
    printableType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    showOnA4: PropTypes.bool,
    showOnLegal: PropTypes.bool,
    showOnLetter: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

RightDescriptionSection.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    showOnA4: false,
    showOnLegal: false,
    showOnLetter: false,
    verticallyAlignContent: false
};

export default RightDescriptionSection;
