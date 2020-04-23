import {castDatePropertyToDateTime} from "@randy.tarampi/js";
import {CampaignLink} from "@randy.tarampi/jsx";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumePublicationsEntry = ({publicationsEntry, index}) => {
    const date = castDatePropertyToDateTime(publicationsEntry.releaseDate);
    const dateString = date.toLocaleString(DateTime.DATE_FULL);

    return <Row className={index > 2 ? "hide-on-print" : null}>
        <Col s={12} className="resume-publications-entry">
            <Row>
                <Col s={12} className="resume-publications-entry__basics">
                    <h5 className="right hide-on-small-only">
                        <span className="resume-publications-entry__date">{dateString}</span>
                    </h5>
                    <h4>
                        <span className="resume-publications-entry__name">
                            <span className="text">
                            {
                                publicationsEntry.url
                                    ? <CampaignLink href={publicationsEntry.url} text={publicationsEntry.name}/>
                                    : publicationsEntry.name
                            }
                            </span>
                        </span>
                    </h4>
                    <h5 className="hide-on-med-and-up">
                        <span className="resume-publications-entry__date">{dateString}</span>
                    </h5>
                    {
                        publicationsEntry.url
                            ? <div className="right hide-on-small-only">
                                <CampaignLink className="resume-publications-entry__url link--web"
                                              href={publicationsEntry.url}/>
                            </div>
                            : null
                    }
                    <p className="resume-publications-entry__publisher">
                        Published&nbsp;<em>by</em>&nbsp;{publicationsEntry.publisher}
                    </p>
                    <p className="resume-publications-entry__summary">
                        {publicationsEntry.summary}
                    </p>
                </Col>
            </Row>
        </Col>
    </Row>;
};

ResumePublicationsEntry.propTypes = {
    index: PropTypes.number.isRequired,
    publicationsEntry: PropTypes.object.isRequired
};

export default ResumePublicationsEntry;
