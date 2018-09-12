import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import ResumePublicationsEntry from "./entry";

export const ResumePublications = ({resume}) => {
    return <PrintableSection printableType="resume" type="publications" label="Publications">
        {
            resume.publications.map((publicationsEntry, index) => {
                return <ResumePublicationsEntry publicationsEntry={publicationsEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumePublications.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumePublications;
