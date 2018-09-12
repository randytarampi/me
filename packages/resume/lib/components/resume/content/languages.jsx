import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeLanguages = ({resume}) => {
    return <PrintableSection printableType="resume" type="languages" label="Languages" hideOnPrint={true}>
        <Row>
            {
                resume.languages.map((languageEntry, index) => {
                    return <Col l={4} m={6} s={12} className="resume-languages__language-entry" key={index}>
                        <strong className="resume-languages__language"><span
                            className="text">{languageEntry.language}</span></strong>
                        &nbsp;
                        <span className="resume-languages__fluency">{languageEntry.fluency}</span>
                    </Col>;
                })
            }
        </Row>
    </PrintableSection>;
};

ResumeLanguages.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeLanguages;
