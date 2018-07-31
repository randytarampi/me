import Link, {
    AngelListLink,
    F00pxLink,
    FacebookLink,
    FlickrLink,
    GitHubLink,
    InstagramLink,
    LinkedInLink,
    TwitterLink
} from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import ResumeSection from "./section";

const networkLinkMap = {
    angellist: AngelListLink,
    f00px: F00pxLink,
    facebook: FacebookLink,
    flickr: FlickrLink,
    github: GitHubLink,
    instagram: InstagramLink,
    linkedin: LinkedInLink,
    twitter: TwitterLink,
};

const getLinkComponentForProfile = profile => {
    const network = profile.network;
    let ExistingLinkComponent = networkLinkMap[network.toLowerCase()];
    let linkComponent = null;

    if (!ExistingLinkComponent) {
        if (profile.url) {
            linkComponent = <span>
                <span className="text">{network}</span>&nbsp;<Link href={profile.url}>{profile.username}</Link>
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
    return <ResumeSection type="profiles" label="Profiles" hideOnPrint={true}>
        <Row>
            {
                resume.basics.profiles.map(profile => {
                    const linkComponent = getLinkComponentForProfile(profile);

                    if (linkComponent) {
                        return <Col key={profile.network} l={4} m={6} s={12} className="resume-profiles__profile">
                            {linkComponent}
                        </Col>;
                    } else {
                        return null;
                    }
                })
            }
        </Row>
    </ResumeSection>;
};

ResumeProfiles.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeProfiles;
