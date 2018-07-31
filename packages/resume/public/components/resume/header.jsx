import {EmailLink, TelLink, WebLink} from "@randy.tarampi/jsx/lib/components/link";
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
                            <div className="col s6 resume-header__email">
                                <EmailLink email={resume.basics.email}/>
                            </div>
                            <div className="col s6 resume-header__tel">
                                <TelLink tel={resume.basics.phone}/>
                            </div>
                        </Row>
                        {
                            resume.basics.website
                                ? <Row className="valign-wrapper hide-on-screen">
                                    <div className="col s12 resume-header__web">
                                        <WebLink href={resume.basics.website}/>
                                    </div>
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
