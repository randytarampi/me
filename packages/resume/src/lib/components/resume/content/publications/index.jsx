import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent";
import ResumePublicationsEntry from "./entry";

export const ResumePublications = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
    >
        {
            resume.publications.map((publicationsEntry, index) => {
                return <ResumePublicationsEntry publicationsEntry={publicationsEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumePublications.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.object.isRequired
};

ResumePublications.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Publications",
    type: "publications"
};

export default ResumePublications;
