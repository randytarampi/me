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

ResumeSkills.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Skills",
    type: "skills"
};

export default ResumeSkills;
