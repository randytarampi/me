import PropTypes from "prop-types";
import React, {Fragment} from "react";
import ResumeSection from "../section";
import ResumeProjectsEntry from "./entry";

export const ResumeProjects = ({resume}) => {
    return <ResumeSection
        type="project"
        label="Projects"
        hideOnPrint={true}
        descriptionNode={
            <Fragment>
                <p><span className="text">Vanity seems to be in vogue and I'm not usually one for ideas, so these are all about me</span>
                </p>
                <p><span className="text">Frankly, I'd much rather be outside exploring rather than on my computer in my downtime</span>
                </p>
            </Fragment>
        }
    >
        {
            resume.projects.map((projectsEntry, index) => {
                return <ResumeProjectsEntry projectsEntry={projectsEntry} key={index} index={index}/>;
            })
        }
    </ResumeSection>;
};

ResumeProjects.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeProjects;
