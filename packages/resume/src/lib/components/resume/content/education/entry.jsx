import {castDatePropertyToDateTime} from "@randy.tarampi/js";
import {CampaignLink} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

const monthYearFormat = {month: "long", year: "numeric"};

export const ResumeEducationEntry = ({educationEntry, index}) => {
    const startDate = castDatePropertyToDateTime(educationEntry.startDate);
    const endDate = educationEntry.endDate && castDatePropertyToDateTime(educationEntry.endDate) || null;
    const dateString = `${startDate.toLocaleString(monthYearFormat)} to ${endDate ? endDate.toLocaleString(monthYearFormat) : "Present"}`;

    return <Row className={index > 2 ? "hide-on-print" : null}>
        <Col s={12} className="resume-education-entry">
            <Row>
                <Col s={12} className="resume-education-entry__basics">
                    <h5 className="right hide-on-small-only">
                        <span className="resume-education-entry__date">{dateString}</span>
                    </h5>
                    <h4>
                        <span className="resume-education-entry__institution">
                            <span className="text">
                            {
                                educationEntry.website
                                    ? <CampaignLink href={educationEntry.website} text={educationEntry.institution}/>
                                    : educationEntry.institution
                            }
                            </span>
                        </span>
                    </h4>
                    <h5 className="hide-on-med-and-up">
                        <span className="resume-education-entry__date">{dateString}</span>
                    </h5>
                </Col>
            </Row>
            <Row>
                <Col s={12} className="resume-education-entry__details">
                    <div className="right hide-on-small-only">
                        <span className="resume-education-entry__area">{educationEntry.area}</span>
                    </div>
                    <div>
                        <span className="resume-education-entry__study-type">
                            <span className="text">{educationEntry.studyType}</span>
                        </span>
                    </div>
                    <div className="hide-on-med-and-up">
                        <span className="resume-education-entry__area">{educationEntry.area}</span>
                    </div>
                </Col>
            </Row>
            {
                educationEntry.courses
                    ? <Row>
                        <Col s={12}>
                            <h5>
                                <span className="text">Highlights</span>
                            </h5>
                            <ul className="resume-education-entry__highlights">
                                {
                                    educationEntry.courses.map((highlight, index) => {
                                        return <li
                                            className={`resume-education-entry__highlight${index > 3 ? " hide-on-print" : ""}`}
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

ResumeEducationEntry.propTypes = {
    index: PropTypes.number.isRequired,
    educationEntry: PropTypes.object.isRequired
};

export default ResumeEducationEntry;
