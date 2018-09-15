import {LoadingSpinner, PrintableHeader} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Component, Fragment} from "react";
import {Helmet} from "react-helmet";
import {Container} from "react-materialize";
import defaultResume from "../../../resumes/default";
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
        const {isLoading, fetchResume, match, variant, ...props} = this.props; // eslint-disable-line no-unused-vars

        return <div className="printable resume">
            {
                isLoading || !props.resume
                    ? <LoadingSpinner/>
                    : <Fragment>
                        <Helmet>
                            <link rel="canonical" href={__PUBLISHED_RESUME_URL__}/>
                            <meta name="og:url" content={__PUBLISHED_RESUME_URL__}/>
                        </Helmet>
                        <PrintableHeader printable={props.resume}/>
                        <div className="resume-content">
                            <Container>
                                <ResumeContact {...props} />
                                {
                                    props.resume.basics.summary
                                        ? <ResumeAbout {...props} />
                                        : null
                                }
                                {
                                    props.resume.basics.profiles && props.resume.basics.profiles.size
                                        ? <ResumeProfiles {...props} />
                                        : null
                                }
                                {
                                    props.resume.work && props.resume.work.size
                                        ? <ResumeWork {...props} />
                                        : null
                                }
                                {
                                    props.resume.projects && props.resume.projects.size
                                        ? <ResumeProjects{...props} />
                                        : null
                                }
                                {
                                    props.resume.skills && props.resume.skills.size
                                        ? <ResumeSkills{...props} />
                                        : null
                                }
                                {
                                    props.resume.education && props.resume.education.size
                                        ? <ResumeEducation {...props} />
                                        : null
                                }
                                {
                                    props.resume.awards && props.resume.awards.size
                                        ? <ResumeAwards {...props} />
                                        : null
                                }
                                {
                                    props.resume.volunteer && props.resume.volunteer.size
                                        ? <ResumeVolunteer {...props} />
                                        : null
                                }
                                {
                                    props.resume.publications && props.resume.publications.size
                                        ? <ResumePublications {...props} />
                                        : null
                                }
                                {
                                    props.resume.languages && props.resume.languages.size
                                        ? <ResumeLanguages {...props} />
                                        : null
                                }
                                {
                                    props.resume.interests && props.resume.interests.size
                                        ? <ResumeInterests {...props} />
                                        : null
                                }
                                {
                                    props.resume.references && props.resume.references.size
                                        ? <ResumeReferences {...props} />
                                        : null
                                }
                            </Container>
                        </div>
                        <ResumeFooter {...props} />
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
