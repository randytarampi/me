import PropTypes from "prop-types";
import React from "react";
import {Helmet} from "react-helmet";
import ResumeJson from "../../../resume.json";
import ResumeAbout from "./content/about";
import ResumeAwards from "./content/awards";
import ResumeContact from "./content/contact";
import ResumeEducation from "./content/education";
import ResumeInterests from "./content/interests";
import ResumeLanguages from "./content/languages";
import ResumeProfiles from "./content/profiles";
import ResumeProjects from "./content/projects";
import ResumePublications from "./content/publications";
import ResumeReferences from "./content/references";
import ResumeSkills from "./content/skills";
import ResumeVolunteer from "./content/volunteer";
import ResumeWork from "./content/work";
import ResumeFooter from "./footer";
import ResumeHeader from "./header";

export const Resume = props => <div className="resume">
    <Helmet>
        <title>{props.resume.basics.name} &mdash; {props.resume.basics.label}</title>
        <meta itemProp="name" content={props.resume.basics.name}/>
        <meta name="twitter:title" content={props.resume.basics.name}/>
        <meta name="og:title" content={props.resume.basics.name}/>
        <meta name="og:site_name" content={props.resume.basics.name}/>
        <meta name="description" content={props.resume.basics.label}/>
        <meta itemProp="description" content={props.resume.basics.label}/>
        <meta name="twitter:description" content={props.resume.basics.label}/>
        <meta name="og:description" content={props.resume.basics.label}/>
        <meta name="image" content="/ʕつ•ᴥ•ʔつ.svg"/>
        <meta itemProp="image" content="/ʕつ•ᴥ•ʔつ.svg"/>
        <meta name="twitter:image:src" content="/ʕつ•ᴥ•ʔつ.svg"/>
        <meta name="og:image" content="/ʕつ•ᴥ•ʔつ.svg"/>
        <meta name="twitter:site" content="@randytarampi"/>
        <meta name="twitter:creator" content="@randytarampi"/>
        <meta name="og:locale" content="en_CA"/>
        <meta name="fb:admins" content="831915416"/>
        <meta name="fb:app_id" content="1705404522846104"/>
        <meta name="og:type" content="website"/>
        <link rel="canonical" href={props.resume.publish_url}/>
        <meta name="og:url" content={props.resume.publish_url}/>
    </Helmet>
    <ResumeHeader {...props} />
    <div className="resume-content">
        <div className="container">
            <ResumeContact {...props} />
            {
                props.resume.basics.summary
                    ? <ResumeAbout {...props} />
                    : null
            }
            {
                props.resume.basics.profiles && props.resume.basics.profiles.length
                    ? <ResumeProfiles {...props} />
                    : null
            }
            {
                props.resume.work && props.resume.work.length
                    ? <ResumeWork {...props} />
                    : null
            }
            {
                props.resume.projects && props.resume.projects.length
                    ? <ResumeProjects{...props} />
                    : null
            }
            {
                props.resume.skills && props.resume.skills.length
                    ? <ResumeSkills{...props} />
                    : null
            }
            {
                props.resume.education && props.resume.education.length
                    ? <ResumeEducation {...props} />
                    : null
            }
            {
                props.resume.awards && props.resume.awards.length
                    ? <ResumeAwards {...props} />
                    : null
            }
            {
                props.resume.volunteer && props.resume.volunteer.length
                    ? <ResumeVolunteer {...props} />
                    : null
            }
            {
                props.resume.publications && props.resume.publications.length
                    ? <ResumePublications {...props} />
                    : null
            }
            {
                props.resume.languages && props.resume.languages.length
                    ? <ResumeLanguages {...props} />
                    : null
            }
            {
                props.resume.interests && props.resume.interests.length
                    ? <ResumeInterests {...props} />
                    : null
            }
            {
                props.resume.references && props.resume.references.length
                    ? <ResumeReferences {...props} />
                    : null
            }
        </div>
    </div>
    <ResumeFooter {...props} />
</div>;

Resume.propTypes = {
    resume: PropTypes.object.isRequired
};

Resume.defaultProps = {
    resume: ResumeJson
};

export default Resume;
