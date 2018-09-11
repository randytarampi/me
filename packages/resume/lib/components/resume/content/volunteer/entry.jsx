import {CampaignLink} from "@randy.tarampi/jsx/lib/components/link";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

const monthYearFormat = {month: "long", year: "numeric"};

export const ResumeVolunteerEntry = ({volunteerEntry, index}) => {
    const startDate = DateTime.fromISO(volunteerEntry.startDate);
    const endDate = volunteerEntry.endDate && DateTime.fromISO(volunteerEntry.endDate) || null;
    const dateString = `${startDate.toLocaleString(monthYearFormat)} to ${endDate ? endDate.toLocaleString(monthYearFormat) : "Present"}`;

    return <Row className={index > 2 ? "hide-on-print" : null}>
        <Col s={12} className="resume-volunteer-entry">
            <Row>
                <Col s={12} className="resume-volunteer-entry__basics">
                    <h5 className="right hide-on-small-only">
                        <span className="resume-volunteer-entry__date">{dateString}</span>
                    </h5>
                    <h4>
                        <span className="resume-volunteer-entry__organization">
                            <span className="text">
                            {
                                volunteerEntry.website
                                    ? <CampaignLink href={volunteerEntry.website} text={volunteerEntry.organization}/>
                                    : volunteerEntry.organization
                            }
                            </span>
                        </span>
                    </h4>
                    <h5 className="hide-on-med-and-up">
                        <span className="resume-volunteer-entry__date">{dateString}</span>
                    </h5>
                </Col>
            </Row>
            <Row>
                <Col s={12} className="resume-volunteer-entry__details">
                    {
                        volunteerEntry.website
                            ? <div className="right hide-on-small-only">
                                <CampaignLink className="resume-volunteer-entry__website link--web"
                                              href={volunteerEntry.website}/>
                            </div>
                            : null
                    }
                    <div>
                        <span className="resume-volunteer-entry__position">
                            <span className="text">{volunteerEntry.position}</span>
                        </span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col s={12}>
                    <p className="resume-volunteer-entry__summary">
                        {volunteerEntry.summary}
                    </p>
                </Col>
            </Row>
            {
                volunteerEntry.highlights
                    ? <Row className="hide-on-print">
                        <Col s={12}>
                            <ul className="resume-volunteer-entry__highlights">
                                {
                                    volunteerEntry.highlights.map((highlight, index) => {
                                        return <li
                                            className={`resume-volunteer-entry__highlight${index < 3 ? " show-on-letter show-on-a4" : ""}${index >= 3 ? " show-on-legal" : ""}`}
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

ResumeVolunteerEntry.propTypes = {
    index: PropTypes.number.isRequired,
    volunteerEntry: PropTypes.object.isRequired
};

export default ResumeVolunteerEntry;
