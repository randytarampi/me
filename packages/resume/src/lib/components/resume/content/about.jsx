import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../resumeCustomContent.js";

export const ResumeAbout = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={((customContent && customContent[type]) || {}).label || label}
        labelNode={((customContent && customContent[type]) || {}).labelNode}
        description={((customContent && customContent[type]) || {}).description}
        descriptionNode={((customContent && customContent[type]) || {}).descriptionNode}
    >
        <p className="resume-about__summary">
            {resume.basics.summary}
        </p>
    </PrintableSection>;
};

ResumeAbout.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

ResumeAbout.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "About",
    type: "about"
};

export default ResumeAbout;
