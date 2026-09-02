import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent.js";
import ResumeProjectsEntry from "./entry.jsx";

export const ResumeProjects = ({resume, customContent = new ResumeCustomContent(), type = "projects", label = "Projects"}) => {
    return <PrintableSection
        printableType="resume"
        hideOnPrint={true}
        type={type}
        label={((customContent && customContent[type]) || {}).label || label}
        labelNode={((customContent && customContent[type]) || {}).labelNode}
        description={((customContent && customContent[type]) || {}).description}
        descriptionNode={((customContent && customContent[type]) || {}).descriptionNode}
    >
        {
            resume.projects.map((projectsEntry, index) => {
                return <ResumeProjectsEntry projectsEntry={projectsEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumeProjects.propTypes = {
    resume: PropTypes.object.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

export default ResumeProjects;
