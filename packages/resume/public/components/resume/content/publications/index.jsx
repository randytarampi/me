import PropTypes from "prop-types";
import React from "react";
import ResumeSection from "../section";
import ResumePublicationsEntry from "./entry";

export const ResumePublications = ({resume}) => {
    return <ResumeSection type="publications" label="Publications">
        {
            resume.publications.map((publicationsEntry, index) => {
                return <ResumePublicationsEntry publicationsEntry={publicationsEntry} key={index} index={index}/>;
            })
        }
    </ResumeSection>;
};

ResumePublications.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumePublications;
