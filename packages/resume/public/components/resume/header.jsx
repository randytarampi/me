import {CampaignLink, EmailLink, TelLink} from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeHeader = ({resume}) => {
    return <header id="header" className="resume-header">
        <div className="container">
            <Row className="valign-wrapper">
                <Col s={3}>
                    {
                        resume.basics.picture
                            ? <img className="resume-header__picture" src={resume.basics.picture}
                                   alt={resume.basics.name}/>
                            : null
                    }
                </Col>
                <Col s={9}>
                    <h1 className="resume-header__name">
                        <span className="text">{resume.basics.name}</span>
                    </h1>

                    <h3 className="resume-header__label hide-on-print">
                        {resume.basics.label}
                    </h3>
                    <div className="resume-header__contact">
                        <Row className="valign-wrapper hide-on-screen">
                            <Col s={6} className="resume-header__email">
                                <EmailLink email={resume.basics.email}/>
                            </Col>
                            <Col s={6} className="resume-header__tel">
                                <TelLink tel={resume.basics.phone}/>
                            </Col>
                        </Row>
                        {
                            resume.basics.website || resume.basics.location && resume.basics.location.address
                                ? <Row className="valign-wrapper hide-on-screen">
                                    {
                                        resume.basics.website
                                            ? <Col m={6} s={12} className="resume-header__web">
                                                <CampaignLink href={resume.basics.website} className="link--web"/>
                                            </Col>
                                            : null
                                    }
                                    {
                                        resume.basics.location && resume.basics.location.city
                                            ? <Col m={6} s={12} className="resume-header__location">
                                                <span><i className="fas fa-map-marker-alt"></i>&nbsp;{resume.basics.location.city}, {resume.basics.location.region}, {resume.basics.location.countryCode}</span>
                                            </Col>
                                            : null
                                    }
                                </Row>
                                : null
                        }

                    </div>
                </Col>
            </Row>
        </div>
    </header>;
};

ResumeHeader.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeHeader;
