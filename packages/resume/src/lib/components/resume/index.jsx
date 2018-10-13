import {LoadingSpinner, PrintableHeader} from "@randy.tarampi/jsx";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import PropTypes from "prop-types";
import React, {Component, Fragment} from "react";
import {Helmet} from "react-helmet";
import {Container} from "react-materialize";
import defaultResume from "../../../resumes";
import Resume from "../../resume";
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

export class ResumeComponent extends Component {
    componentDidMount() {
        if (this.props.variant) {
            this.props.fetchResume(this.props.variant);
        }
    }

    render() {
        const {isLoading, fetchResume, match, variant, resume, ...props} = this.props; // eslint-disable-line no-unused-vars
        let contentProps = {
            ...props,
            resume
        };

        return <div className="printable resume">
            {
                isLoading || !resume
                    ? <LoadingSpinner/>
                    : <Fragment>
                        <Helmet>
                            <title>{`${resume.basics.name} — ${resume.basics.label}`}</title>
                            <link rel="canonical" href={__PUBLISHED_RESUME_URL__}/>
                            <meta name="og:url" content={__PUBLISHED_RESUME_URL__}/>
                        </Helmet>
                        <SchemaJsonLdComponent markup={resume.toSchema()}/>
                        <PrintableHeader printable={resume}/>
                        <div className="resume-content">
                            <Container>
                                <ResumeContact {...contentProps} />
                                {
                                    resume.basics.summary
                                        ? <ResumeAbout {...contentProps} />
                                        : null
                                }
                                {
                                    resume.basics.profiles && resume.basics.profiles.size
                                        ? <ResumeProfiles {...contentProps} />
                                        : null
                                }
                                {
                                    resume.work && resume.work.size
                                        ? <ResumeWork {...contentProps} />
                                        : null
                                }
                                {
                                    resume.projects && resume.projects.size
                                        ? <ResumeProjects{...contentProps} />
                                        : null
                                }
                                {
                                    resume.skills && resume.skills.size
                                        ? <ResumeSkills{...contentProps} />
                                        : null
                                }
                                {
                                    resume.education && resume.education.size
                                        ? <ResumeEducation {...contentProps} />
                                        : null
                                }
                                {
                                    resume.awards && resume.awards.size
                                        ? <ResumeAwards {...contentProps} />
                                        : null
                                }
                                {
                                    resume.volunteer && resume.volunteer.size
                                        ? <ResumeVolunteer {...contentProps} />
                                        : null
                                }
                                {
                                    resume.publications && resume.publications.size
                                        ? <ResumePublications {...contentProps} />
                                        : null
                                }
                                {
                                    resume.languages && resume.languages.size
                                        ? <ResumeLanguages {...contentProps} />
                                        : null
                                }
                                {
                                    resume.interests && resume.interests.size
                                        ? <ResumeInterests {...contentProps} />
                                        : null
                                }
                                {
                                    resume.references && resume.references.size
                                        ? <ResumeReferences {...contentProps} />
                                        : null
                                }
                            </Container>
                        </div>
                        <ResumeFooter {...contentProps} />
                    </Fragment>
            }
        </div>;
    }
}

ResumeComponent.propTypes = {
    isLoading: PropTypes.bool,
    resume: PropTypes.object,
    fetchResume: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

ResumeComponent.defaultProps = {
    resume: Resume.fromResume(defaultResume)
};

export default ResumeComponent;
