import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeSection = ({type, label, labelNode, description, descriptionNode, hideOnPrint, showOnLetter, showOnA4, showOnLegal, hideOnScreen, verticallyAlignContent, className, children}) => {
    const classNames = [
        "resume-section",
        "resume-" + type
    ];

    if (hideOnScreen) {
        classNames.push("hide-on-screen");
    }

    // FIXME-RT: Actually get print specific styles in per fbb5a85af94ec3e25c5efed9b16b6d64bcc11dcf.
    if (hideOnPrint || showOnA4 || showOnLetter || showOnLegal) {
        classNames.push("hide-on-print");
    }

    return <section id={type} className={classNames.concat(className).join(" ").trim()}>
        <Row className={verticallyAlignContent ? "valign-wrapper" : null}>
            <aside className="col m3 resume-section__header">
                {
                    labelNode
                        ? labelNode
                        : <h3 className="resume-section__label"><span className="text">{label}</span></h3>
                }
                {
                    descriptionNode || description
                        ? <Row className="hide-on-large-only hide-on-small-only">
                            <Col s={9}>
                                {
                                    descriptionNode
                                        ? <div className="resume-section__description">{descriptionNode}</div>
                                        : description
                                        ? <p className="resume-section__description"><span className="text">{description}</span></p>
                                        : null
                                }
                            </Col>
                        </Row>
                        : null
                }
            </aside>
            <Col m={8} offset="s1" className="resume-section__content">
                {children}
            </Col>
        </Row>
    </section>;
};

ResumeSection.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    labelNode: PropTypes.node,
    description: PropTypes.string,
    descriptionNode: PropTypes.node,
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    showOnA4: PropTypes.bool,
    showOnLegal: PropTypes.bool,
    showOnLetter: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

ResumeSection.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    showOnA4: false,
    showOnLegal: false,
    showOnLetter: false,
    verticallyAlignContent: false
};

export default ResumeSection;
