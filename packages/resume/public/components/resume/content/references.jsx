import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import ResumeSection from "./section";

export const ResumeReferences = ({resume}) => {
    return <ResumeSection type="references" label="References" hideOnPrint={true}>
        <Row>
            {
                resume.references.map((referenceEntry, index) => {
                    return <Col s={12} className="resume-references__reference-entry" key={index}>
                        <blockquote className="resume-references__reference">
                            <p>
                                <span className="text">{referenceEntry.reference}</span>
                            </p>
                            <p>
                                &mdash;&nbsp;<strong className="text">{referenceEntry.name}</strong>
                            </p>
                        </blockquote>
                    </Col>;
                })
            }
        </Row>
    </ResumeSection>;
};

ResumeReferences.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeReferences;
