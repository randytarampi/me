import Link, {WebLink} from "@randy.tarampi/jsx/lib/components/link";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

const monthYearFormat = {month: "long", year: "numeric"};

export const ResumeProjectEntry = ({projectEntry, index}) => {
    const startDate = DateTime.fromISO(projectEntry.startDate);
    const endDate = projectEntry.endDate && DateTime.fromISO(projectEntry.endDate) || null;
    const dateString = `${startDate.toLocaleString(monthYearFormat)} to ${endDate ? endDate.toLocaleString(monthYearFormat) : "Present"}`;

    return <Row className={index > 2 ? "hide-on-print" : null}>
        <Col s={12} className="resume-project-entry">
            <Row>
                <Col s={12} className="resume-project-entry__basics">
                    <h5 className="right hide-on-small-only">
                        <span className="resume-project-entry__date">{dateString}</span>
                    </h5>
                    <h4>
                        <span className="resume-project-entry__name">
                            <span className="text">
                            {
                                projectEntry.url
                                    ? <Link href={projectEntry.url}>{projectEntry.name}</Link>
                                    : projectEntry.company
                            }
                            </span>
                        </span>
                    </h4>
                    <h5 className="hide-on-med-and-up">
                        <span className="resume-project-entry__date">{dateString}</span>
                    </h5>
                </Col>
            </Row>
            <Row>
                <Col s={12} className="resume-project-entry__details">
                    {
                        projectEntry.url
                            ? <div className="right hide-on-small-only">
                                <WebLink className="resume-project-entry__website" href={projectEntry.url}/>
                            </div>
                            : null
                    }
                    {
                        projectEntry.roles
                            ? <div>
                        <span className="resume-project-entry__position">
                            <span className="text">{projectEntry.roles.join(", ")}</span>
                        </span>
                            </div>
                            : null
                    }
                </Col>
            </Row>
            <Row>
                <Col s={12}>
                    <p className="resume-project-entry__description">
                        {projectEntry.description}
                    </p>
                </Col>
            </Row>
            {
                projectEntry.highlights
                    ? <Row>
                        <Col s={12}>
                            <ul className="resume-project-entry__highlights">
                                {
                                    projectEntry.highlights.map((highlight, index) => {
                                        return <li
                                            className={`resume-project-entry__highlight${index < 3 ? " show-on-letter show-on-a4" : ""}${index >= 3 ? " show-on-legal" : ""}`}
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

ResumeProjectEntry.propTypes = {
    index: PropTypes.number.isRequired,
    projectEntry: PropTypes.object.isRequired
};

export default ResumeProjectEntry;
