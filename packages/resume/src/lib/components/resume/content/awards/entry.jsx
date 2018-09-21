import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeAwardsEntry = ({awardsEntry, index}) => {
    const date = DateTime.fromISO(awardsEntry.date);
    const dateString = date.toLocaleString(DateTime.DATE_FULL);

    return <Row className={index > 2 ? "hide-on-print" : null}>
        <Col s={12} className="resume-awards-entry">
            <Row>
                <Col s={12} className="resume-awards-entry__basics">
                    <h5 className="right hide-on-small-only">
                        <span className="resume-awards-entry__date">{dateString}</span>
                    </h5>
                    <h4>
                        <span className="resume-awards-entry__title">
                            <span className="text">
                                {awardsEntry.title}
                            </span>
                        </span>
                    </h4>
                    <h5 className="hide-on-med-and-up">
                        <span className="resume-awards-entry__date">{dateString}</span>
                    </h5>
                    <p className="resume-awards-entry__awarder">
                        Awarded&nbsp;<em>by</em>&nbsp;{awardsEntry.awarder}
                    </p>
                    <p className="resume-awards-entry__summary">
                        {awardsEntry.summary}
                    </p>
                </Col>
            </Row>
        </Col>
    </Row>;
};

ResumeAwardsEntry.propTypes = {
    index: PropTypes.number.isRequired,
    awardsEntry: PropTypes.object.isRequired
};

export default ResumeAwardsEntry;
