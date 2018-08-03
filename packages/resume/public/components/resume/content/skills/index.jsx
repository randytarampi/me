import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Row} from "react-materialize";
import ResumeSection from "../section";
import ResumeSkillsEntry from "./entry";

export const ResumeSkills = ({resume}) => {
    return <ResumeSection
        type="skills"
        label="Skills"
        descriptionNode={
            <Fragment>
                <p><span className="text">I'm more or less a full stack JavaScript developer</span></p>
                <p><span className="text">Ask me about my soft skills &mdash; those are more fun</span></p>
            </Fragment>
        }
    >
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
