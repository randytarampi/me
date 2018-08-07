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
import ResumePublications from "./content/publications";
import ResumeReferences from "./content/references";
import ResumeSkills from "./content/skills";
import ResumeVolunteer from "./content/volunteer";
import ResumeWork from "./content/work";
import ResumeFooter from "./footer";
import ResumeHeader from "./header";

export const Resume = props => <div className="resume">
    <Helmet>
        <title>
            {props.resume.basics.name} &emdash; {props.resume.basics.label}
        </title>
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
