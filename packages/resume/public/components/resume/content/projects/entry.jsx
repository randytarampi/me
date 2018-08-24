import {CampaignLink} from "@randy.tarampi/jsx/lib/components/link";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

const monthYearFormat = {month: "long", year: "numeric"};

export const ResumeProjectsEntry = ({projectsEntry, index}) => {
    const startDate = DateTime.fromISO(projectsEntry.startDate);
    const endDate = projectsEntry.endDate && DateTime.fromISO(projectsEntry.endDate) || null;
    const dateString = `${startDate.toLocaleString(monthYearFormat)} to ${endDate ? endDate.toLocaleString(monthYearFormat) : "Present"}`;

    return <Row className={index > 2 ? "hide-on-print" : null}>
        <Col s={12} className="resume-projects-entry">
            <Row>
                <Col s={12} className="resume-projects-entry__basics">
                    <h5 className="right hide-on-small-only">
                        <span className="resume-projects-entry__date">{dateString}</span>
                    </h5>
                    <h4>
                        <span className="resume-projects-entry__name">
                            <span className="text">
                            {
                                projectsEntry.url
                                    ? <CampaignLink href={projectsEntry.url}>{projectsEntry.name}</CampaignLink>
                                    : projectsEntry.company
                            }
                            </span>
                        </span>
                    </h4>
                    <h5 className="hide-on-med-and-up">
                        <span className="resume-projects-entry__date">{dateString}</span>
                    </h5>
                </Col>
            </Row>
            <Row>
                <Col s={12} className="resume-projects-entry__details">
                    {
                        projectsEntry.url
                            ? <div className="right hide-on-small-only">
                                <CampaignLink className="resume-projects-entry__website link--web"
                                              href={projectsEntry.url}/>
                            </div>
                            : null
                    }
                    {
                        projectsEntry.roles
                            ? <div>
                        <span className="resume-projects-entry__position">
                            <span className="text">{projectsEntry.roles.join(", ")}</span>
                        </span>
                            </div>
                            : null
                    }
                </Col>
            </Row>
            <Row>
                <Col s={12}>
                    <p className="resume-projects-entry__description">
                        {projectsEntry.description}
                    </p>
                </Col>
            </Row>
            {
                projectsEntry.highlights
                    ? <Row>
                        <Col s={12}>
                            <ul className="resume-projects-entry__highlights">
                                {
                                    projectsEntry.highlights.map((highlight, index) => {
                                        return <li
                                            className={`resume-projects-entry__highlight${index < 3 ? " show-on-letter show-on-a4" : ""}${index >= 3 ? " show-on-legal" : ""}`}
                                            key={index}>
                                            {highlight}
                                        </li>;
                                    })
                                }
                            </ul>
                        </Col>
                    </Row>
                    : null
            }
        </Col>
    </Row>;
};

ResumeProjectsEntry.propTypes = {
    index: PropTypes.number.isRequired,
    projectsEntry: PropTypes.object.isRequired
};

export default ResumeProjectsEntry;
