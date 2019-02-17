import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent";
import ResumeEducationEntry from "./entry";

export const ResumeEducation = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
    >
        {
            resume.education.map((educationEntry, index) => {
                return <ResumeEducationEntry educationEntry={educationEntry} key={index} index={index}
                                             customContentForType={customContent[type]}/>;
            })
        }
    </PrintableSection>;
};

ResumeEducation.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

ResumeEducation.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Education",
    type: "education"
};

export default ResumeEducation;
