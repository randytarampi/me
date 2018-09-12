import {CampaignLink, PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import ResumeProjectsEntry from "./entry";

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
                <div className="shields">
                    <CampaignLink
                        className="shield"
                        href="https://www.randytarampi.ca"
                        aria-label="Is www.randytarampi.ca up?"
                        name="Up status">
                        <img
                            className="shield__image"
                            src="https://img.shields.io/website-up-down-green-red/https/www.randytarampi.ca.svg?label=www.randytarampi.ca&style=flat-square"
                        />
                    </CampaignLink>
                    <CampaignLink
                        className="shield"
                        href="https://uptime.randytarampi.ca"
                        aria-label="Uptime status"
                        name="Uptime">
                        <img
                            className="shield__image"
                            src="https://img.shields.io/uptimerobot/ratio/m780949566-9b1b7cc0bdd3be425a9e6ac8.svg?style=flat-square"
                        />
                    </CampaignLink>
                    <CampaignLink
                        className="shield"
                        href="https://travis-ci.org/randytarampi/me"
                        aria-label="Travis build"
                        name="Travis">
                        <img
                            className="shield__image"
                            src="https://img.shields.io/travis/randytarampi/me.svg?style=flat-square"
                        />
                    </CampaignLink>
                    <CampaignLink
                        className="shield"
                        href="https://coveralls.io/github/randytarampi/me"
                        aria-label="Coveralls score"
                        name="Coveralls">
                        <img
                            className="shield__image"
                            src="https://img.shields.io/coveralls/github/randytarampi/me.svg?style=flat-square"
                        />
                    </CampaignLink>
                    <CampaignLink
                        className="shield"
                        href="https://codeclimate.com/github/randytarampi/me/maintainability"
                        aria-label="Code Climate score"
                        name="Code Climate">
                        <img
                            className="shield__image"
                            src="https://img.shields.io/codeclimate/maintainability-percentage/randytarampi/me.svg?style=flat-square"
                        />
                    </CampaignLink>
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
