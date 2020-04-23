import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import {ResumeCustomContent} from "../../../resumeCustomContent";

export const ResumeLanguages = ({resume, customContent, type, label}) => {
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
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

ResumeLanguages.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Languages",
    type: "languages"
};

export default ResumeLanguages;
