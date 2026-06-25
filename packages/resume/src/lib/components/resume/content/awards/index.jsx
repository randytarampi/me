import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent.js";
import ResumeAwardsEntry from "./entry.jsx";

export const ResumeAwards = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={((customContent && customContent[type]) || {}).label || label}
        labelNode={((customContent && customContent[type]) || {}).labelNode}
        description={((customContent && customContent[type]) || {}).description}
        descriptionNode={((customContent && customContent[type]) || {}).descriptionNode}
    >
        {
            resume.awards.map((awardsEntry, index) => {
                return <ResumeAwardsEntry awardsEntry={awardsEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumeAwards.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

ResumeAwards.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Awards",
    type: "awards"
};

export default ResumeAwards;
