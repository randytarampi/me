import PropTypes from "prop-types";
import React from "react";
import {Row} from "react-materialize";
import ResumeSection from "../section";
import ResumeSkillsEntry from "./entry";

export const ResumeSkills = ({resume}) => {
    return <ResumeSection type="skills" label="Skills">
        <Row>
            {
                resume.skills.map((skillsEntry, index) => {
                    return <ResumeSkillsEntry skillsEntry={skillsEntry} key={index} index={index}/>;
                })
            }
        </Row>
    </ResumeSection>;
};

ResumeSkills.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeSkills;
