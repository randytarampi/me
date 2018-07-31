import PropTypes from "prop-types";
import React from "react";
import ResumeSection from "../section";
import ResumeEducationEntry from "./entry";

export const ResumeEducation = ({resume}) => {
    return <ResumeSection type="education" label="Education">
        {
            resume.education.map((educationEntry, index) => {
                return <ResumeEducationEntry educationEntry={educationEntry} key={index} index={index}/>;
            })
        }
    </ResumeSection>;
};

ResumeEducation.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeEducation;
