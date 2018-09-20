import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent";
import ResumeAwardsEntry from "./entry";

export const ResumeAwards = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
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
    customContent: PropTypes.object.isRequired
};

ResumeAwards.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Awards",
    type: "awards"
};

export default ResumeAwards;
