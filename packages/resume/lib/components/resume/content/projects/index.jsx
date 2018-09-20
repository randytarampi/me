import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent";
import ResumeProjectsEntry from "./entry";

export const ResumeProjects = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        hideOnPrint={true}
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
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
    customContent: PropTypes.object.isRequired
};

ResumeProjects.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Projects",
    type: "projects"
};

export default ResumeProjects;
