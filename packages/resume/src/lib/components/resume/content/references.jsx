import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import {ResumeCustomContent} from "../../../resumeCustomContent";

export const ResumeReferences = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        hideOnPrint={true}
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
    >
        <Row>
            {
                resume.references.map((referenceEntry, index) => {
                    return <Col s={12} className="resume-references__reference-entry" key={index}>
                        <blockquote className="resume-references__reference">
                            <p className="resume-references__reference-quote">
                                <span className="text">{referenceEntry.reference}</span>
                            </p>
                            <p className="resume-references__reference-referee">
                                —&nbsp;<strong className="text">{referenceEntry.name}</strong>
                            </p>
                        </blockquote>
                    </Col>;
                })
            }
        </Row>
    </PrintableSection>;
};

ResumeReferences.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.object.isRequired
};

ResumeReferences.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "References",
    type: "references"
};

export default ResumeReferences;
