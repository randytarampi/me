import {CampaignLink} from "@randy.tarampi/jsx/lib/components/link";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

const monthYearFormat = {month: "long", year: "numeric"};

export const ResumeWorkEntry = ({workEntry, index}) => {
    const startDate = DateTime.fromISO(workEntry.startDate);
    const endDate = workEntry.endDate && DateTime.fromISO(workEntry.endDate) || null;
    const dateString = `${startDate.toLocaleString(monthYearFormat)} to ${endDate ? endDate.toLocaleString(monthYearFormat) : "Present"}`;

    return <Row className={index > 2 ? "hide-on-print" : null}>
        <Col s={12} className="resume-work-entry">
            <Row>
                <Col s={12} className="resume-work-entry__basics">
                    <h5 className="right hide-on-small-only">
                        <span className="resume-work-entry__date">{dateString}</span>
                    </h5>
                    <h4>
                        <span className="resume-work-entry__company">
                            <span className="text">
                            {
                                workEntry.website
                                    ? <CampaignLink href={workEntry.website}>{workEntry.company}</CampaignLink>
                                    : workEntry.company
                            }
                            </span>
                        </span>
                    </h4>
                    <h5 className="hide-on-med-and-up">
                        <span className="resume-work-entry__date">{dateString}</span>
                    </h5>
                </Col>
            </Row>
            <Row>
                <Col s={12} className="resume-work-entry__details">
                    {
                        workEntry.website
                            ? <div className="right hide-on-small-only">
                                <CampaignLink className="resume-work-entry__website link--web" href={workEntry.website}/>
                            </div>
                            : null
                    }
                    <div>
                        <span className="resume-work-entry__position">
                            <span className="text">{workEntry.position}</span>
                        </span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col s={12}>
                    <p className="resume-work-entry__summary">
                        {workEntry.summary}
                    </p>
                </Col>
            </Row>
            {
                workEntry.highlights
                    ? <Row>
                        <Col s={12}>
                            <ul className="resume-work-entry__highlights">
                                {
                                    workEntry.highlights.map((highlight, index) => {
                                        return <li
                                            className={`resume-work-entry__highlight${index < 3 ? " show-on-letter show-on-a4" : ""}${index >= 3 ? " show-on-legal" : ""}`}
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

ResumeWorkEntry.propTypes = {
    index: PropTypes.number.isRequired,
    workEntry: PropTypes.object.isRequired
};

export default ResumeWorkEntry;
