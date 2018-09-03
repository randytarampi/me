import {Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import ResumeProjectsEntry from "./entry";

const {PrintableSection} = Printable;

export const ResumeProjects = ({resume}) => {
    return <PrintableSection
        printableType="resume"
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
    </PrintableSection>;
};

ResumeProjects.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeProjects;
