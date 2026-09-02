import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Row} from "react-materialize";
import {ResumeCustomContent} from "../../../../resumeCustomContent.js";
import ResumeSkillsEntry from "./entry.jsx";

export const ResumeSkills = ({resume, customContent = new ResumeCustomContent(), type = "skills", label = "Skills"}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={((customContent && customContent[type]) || {}).label || label}
        labelNode={((customContent && customContent[type]) || {}).labelNode}
        description={((customContent && customContent[type]) || {}).description}
        descriptionNode={((customContent && customContent[type]) || {}).descriptionNode}
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
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

export default ResumeSkills;
