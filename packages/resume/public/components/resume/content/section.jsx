import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeSection = ({type, label, labelNode, hideOnPrint, hideOnScreen, verticallyAlignContent, className, children}) => {
    const classNames = [
        "resume-section",
        "resume-" + type
    ];

    if (hideOnPrint) {
        classNames.push("hide-on-print");
    }

    if (hideOnScreen) {
        classNames.push("hide-on-screen");
    }

    return <section id="name" className={classNames.concat(className).join(" ").trim()}>
        <Row className={verticallyAlignContent ? "valign-wrapper" : null}>
            <aside className="col m3 resume-section__label">
                {
                    labelNode
                        ? labelNode
                        : <h3><span className="text">{label}</span></h3>
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
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

ResumeSection.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    verticallyAlignContent: false
};

export default ResumeSection;
