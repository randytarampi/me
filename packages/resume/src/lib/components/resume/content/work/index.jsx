import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent";
import ResumeWorkEntry from "./entry";

export const ResumeWork = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
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
