import {
    CampaignContext,
    ConnectedErrorWrapper,
    ErrorENOACCESSContentComponent,
    ErrorESERVERContentComponent,
    LoadingSpinner,
    mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContent,
    PrintableHeader
} from "@randy.tarampi/jsx";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Helmet} from "react-helmet";
import {Container} from "react-materialize";
import defaultResume from "../../../resumes/resume.json";
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

export const mapResumeErrorCodeToErrorContentComponent = errorCode => {
    switch (errorCode) {
        case "EFETCH":
        case "ESERVER":
            return ErrorESERVERContentComponent;

        case "ENORESUME":
            return ErrorENOACCESSContentComponent;

        default:
            return defaultMapErrorCodeToErrorContent(errorCode);
    }
};

export class ResumeComponent extends PureComponent {
    componentDidMount() {
        if (this.props.variant) {
            this.props.fetchResume(this.props.variant);
        }
    }

    render() {
        const {isLoading, fetchResume, match, variant, resume, publishedResumeUrl, ...props} = this.props; // eslint-disable-line no-unused-vars
        const contentProps = {
            ...props,
            publishedResumeUrl,
            resume
        };

        return <div className="printable resume">
            {
                isLoading || !resume
                    ? <LoadingSpinner/>
                    : <CampaignContext.Provider value={resume.renderOptions && resume.renderOptions.toJS()}>
                        <ConnectedErrorWrapper
                            key="resume-error-wrapper"
                            mapErrorCodeToErrorContentComponent={mapResumeErrorCodeToErrorContentComponent}
                        >
                            <Helmet>
                                <title>{`${resume.basics.name} — ${resume.basics.label}`}</title>
                                <link rel="canonical" href={publishedResumeUrl}/>
                                <meta name="og:url" content={publishedResumeUrl}/>
                            </Helmet>
                            <SchemaJsonLdComponent markup={resume.toSchema()}/>
                            <PrintableHeader {...contentProps} printable={resume}/>
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
                        </ConnectedErrorWrapper>
                    </CampaignContext.Provider>
            }
        </div>;
    }
}

ResumeComponent.propTypes = {
    isLoading: PropTypes.bool,
    resume: PropTypes.object,
    variant: PropTypes.string,
    fetchResume: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    publishedResumeUrl: PropTypes.string.isRequired
};

ResumeComponent.defaultProps = {
    resume: Resume.fromResume(defaultResume),
    publishedResumeUrl: __PUBLISHED_RESUME_URL__
};

export default ResumeComponent;
