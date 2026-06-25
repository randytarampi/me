import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent.js";
import ResumeWorkEntry from "./entry.jsx";

export const ResumeWork = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={((customContent && customContent[type]) || {}).label || label}
        labelNode={((customContent && customContent[type]) || {}).labelNode}
        description={((customContent && customContent[type]) || {}).description}
        descriptionNode={((customContent && customContent[type]) || {}).descriptionNode}
    >
        {
            resume.work.map((workEntry, index) => {
                return <ResumeWorkEntry workEntry={workEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumeWork.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

ResumeWork.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Work",
    type: "work"
};

export default ResumeWork;
