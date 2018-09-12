import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Row} from "react-materialize";
import ResumeSkillsEntry from "./entry";

export const ResumeSkills = ({resume}) => {
    return <PrintableSection
        printableType="resume"
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
    </PrintableSection>;
};

ResumeSkills.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeSkills;
