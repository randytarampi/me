import {Link, Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import ResumeProjectsEntry from "./entry";

const {PrintableSection} = Printable;

export const ResumeProjects = ({resume}) => {
    return <PrintableSection
        printableType="resume"
        type="projects"
        label="Projects"
        hideOnPrint={true}
        descriptionNode={
            <Fragment>
                <p><span className="text">Vanity seems to be in vogue and I'm not usually one for ideas, so these are all about me</span>
                </p>
                <p><span className="text">Frankly, I'd much rather be outside exploring rather than on my computer in my downtime</span>
                </p>
                <p><span className="text">Tried to keep myself disciplined here, but I'm a lot better when I have people actually holding me to account</span>
                </p>
                <div>
                    <Link href="https://coveralls.io/github/randytarampi/me" aria-label="Coveralls"
                          name="Coveralls score"><img
                        src="https://img.shields.io/coveralls/github/randytarampi/me.svg?style=flat-square"/></Link>
                    <Link href="https://codeclimate.com/github/randytarampi/me/maintainability"
                          aria-label="Code Climate score" name="Code Climate"><img
                        src="https://img.shields.io/codeclimate/maintainability-percentage/randytarampi/me.svg?style=flat-square"/></Link>
                </div>
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
