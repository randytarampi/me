import PropTypes from "prop-types";
import React from "react";
import ResumeSection from "../section";
import ResumeProjectEntry from "./entry";

export const ResumeProjects = ({resume}) => {
    return <ResumeSection
        type="project"
        label="Projects"
        hideOnPrint={true}
    >
        {
            resume.projects.map((projectEntry, index) => {
                return <ResumeProjectEntry projectEntry={projectEntry} key={index} index={index}/>;
            })
        }
    </ResumeSection>;
};

ResumeProjects.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeProjects;
