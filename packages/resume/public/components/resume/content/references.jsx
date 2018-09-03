import {Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

const {PrintableSection} = Printable;

export const ResumeReferences = ({resume}) => {
    return <PrintableSection printableType="resume" type="references" label="References" hideOnPrint={true}>
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
    </PrintableSection>;
};

ResumeReferences.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeReferences;
