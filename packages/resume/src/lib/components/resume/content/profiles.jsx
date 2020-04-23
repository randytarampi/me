import {CampaignLink, getBrandedLinkForNetwork, PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import {ResumeCustomContent} from "../../../resumeCustomContent";

const getLinkComponentForProfile = profile => {
    const network = profile.network;
    let ExistingLinkComponent = getBrandedLinkForNetwork(network);
    let linkComponent = null;

    if (!ExistingLinkComponent) {
        if (profile.url) {
            linkComponent = <span>
                <span className="text">{network}</span>&nbsp;<CampaignLink
                href={profile.url} text={profile.username}/>
            </span>;
        } else if (profile.username) {
            linkComponent = <span>
                <span className="text">{network}</span>&nbsp;<span>{profile.username}</span>
            </span>;
        }
    } else {
        if (profile.username) {
            linkComponent = <ExistingLinkComponent username={profile.username}/>;
        } else if (profile.url) {
            linkComponent = <ExistingLinkComponent href={profile.url}/>;
        }
    }

    return linkComponent;
};

export const ResumeProfiles = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        showOnA4={true}
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
    >
        <Row>
            {
                resume.basics.profiles.map(profile => {
                    const linkComponent = getLinkComponentForProfile(profile);

                    if (linkComponent) {
                        return <Col key={profile.network} l={4} m={4} s={12} className="resume-profiles__profile">
                            {linkComponent}
                        </Col>;
                    } else {
                        return null;
                    }
                }).filter(element => !!element).slice(0, 6)
            }
        </Row>
    </PrintableSection>;
};

ResumeProfiles.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

ResumeProfiles.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Profiles",
    type: "profiles"
};

export default ResumeProfiles;
