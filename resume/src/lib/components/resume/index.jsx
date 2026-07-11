import {
    CampaignContext,
    ConnectedErrorWrapper,
    ErrorENOACCESSContentComponent,
    ErrorESERVERContentComponent,
    LoadingSpinner,
    mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContent,
    PrintableHeader
} from "@randy.tarampi/jsx";
// NOTE-RT: `@randy.tarampi/schema-dot-org-json-ld-components` is an old, Babel-6-era CJS build
// (`exports.default = ...; exports.__esModule = true;`). webpack's own bundling interop DOES
// special-case `__esModule` (so its default import already unwraps straight to `Component`), but
// Node's native ESM/CJS interop (used by this package's own standalone `esm/` build output) does
// not - a default import of a CommonJS module there always maps to the whole `module.exports`
// value itself (`{default: Component}`). Since the exact same source compiles to both targets,
// this can't be "fixed" with one static import shape; unwrap defensively at runtime instead, so it
// resolves correctly regardless of which interop already ran.
import SchemaJsonLdComponentModule from "@randy.tarampi/schema-dot-org-json-ld-components";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Helmet} from "react-helmet";
import {Container} from "react-materialize";
import defaultResume from "../../../resumes/resume.json" with {type: "json"};
import Resume from "../../resume.js";
import ResumeAbout from "./content/about.jsx";
import ResumeAwards from "./content/awards/index.jsx";
import ResumeContact from "./content/contact.jsx";
import ResumeEducation from "./content/education/index.jsx";
import ResumeInterests from "./content/interests.jsx";
import ResumeLanguages from "./content/languages.jsx";
import ResumeProfiles from "./content/profiles.jsx";
import ResumeProjects from "./content/projects/index.jsx";
import ResumePublications from "./content/publications/index.jsx";
import ResumeReferences from "./content/references.jsx";
import ResumeSkills from "./content/skills/index.jsx";
import ResumeVolunteer from "./content/volunteer/index.jsx";
import ResumeWork from "./content/work/index.jsx";
import ResumeFooter from "./footer.jsx";

const SchemaJsonLdComponent = SchemaJsonLdComponentModule && SchemaJsonLdComponentModule.default
    ? SchemaJsonLdComponentModule.default
    : SchemaJsonLdComponentModule;

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
