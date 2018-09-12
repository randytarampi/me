import {CampaignLink, EmailLink, PrintableSection, TelLink} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeContact = ({resume}) => {
    return <PrintableSection printableType="resume" type="contact" label="Contact" hideOnPrint={true}>
        <Row>
            <Col m={6} s={12} className="resume-contact__email">
                <EmailLink email={resume.basics.email}/>
            </Col>
            <Col m={6} s={12} className="resume-contact__tel">
                <TelLink tel={resume.basics.phone}/>
            </Col>
            {
                resume.basics.website
                    ? <Col s={12} className="resume-contact__web">
                        <CampaignLink href={resume.basics.website} className="link--web"/>
                    </Col>
                    : null
            }
        </Row>
    </PrintableSection>;
};

ResumeContact.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeContact;
