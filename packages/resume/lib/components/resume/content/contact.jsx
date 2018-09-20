import {CampaignLink, EmailLink, PrintableSection, TelLink} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import {ResumeCustomContent} from "../../../resumeCustomContent";

export const ResumeContact = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        hideOnPrint={true}
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
    >
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
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.object.isRequired
};

ResumeContact.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Contact",
    type: "contact"
};

export default ResumeContact;
