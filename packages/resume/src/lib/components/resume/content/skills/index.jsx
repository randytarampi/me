import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Row} from "react-materialize";
import {ResumeCustomContent} from "../../../../resumeCustomContent";
import ResumeSkillsEntry from "./entry";

export const ResumeSkills = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
    >
        <Row>
            {
                resume.skills.map((skillsEntry, index) => {
                    return <ResumeSkillsEntry skillsEntry={skillsEntry} key={index} index={index}/>;
                })
            }
        </Row>
    </PrintableSection>;
};

ResumeSkills.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.object.isRequired
};

ResumeSkills.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Skills",
    type: "skills"
};

export default ResumeSkills;
