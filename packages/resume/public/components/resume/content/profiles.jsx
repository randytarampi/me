import {Printable} from "@randy.tarampi/jsx";
import {
    AngelListLink,
    CampaignLink,
    F00pxLink,
    FacebookLink,
    FlickrLink,
    GitHubLink,
    InstagramLink,
    LinkedInLink,
    StackOverflowLink,
    TwitterLink
} from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

const {PrintableSection} = Printable;

const networkLinkMap = {
    angellist: AngelListLink,
    f00px: F00pxLink,
    facebook: FacebookLink,
    flickr: FlickrLink,
    github: GitHubLink,
    instagram: InstagramLink,
    linkedin: LinkedInLink,
    stackoverflow: StackOverflowLink,
    twitter: TwitterLink,
};

const getLinkComponentForProfile = profile => {
    const network = profile.network;
    let ExistingLinkComponent = networkLinkMap[network.toLowerCase()];
    let linkComponent = null;

    if (!ExistingLinkComponent) {
        if (profile.url) {
            linkComponent = <span>
                <span className="text">{network}</span>&nbsp;<CampaignLink
                href={profile.url}>{profile.username}</CampaignLink>
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

export const ResumeProfiles = ({resume}) => {
    return <PrintableSection printableType="resume" type="profiles" label="Profiles" showOnA4={true}>
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
                })
            }
        </Row>
    </PrintableSection>;
};

ResumeProfiles.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeProfiles;
