import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {ResumeCustomContent} from "../../../../resumeCustomContent";
import ResumeVolunteerEntry from "./entry";

export const ResumeVolunteer = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        hideOnPrint={true}
        type={type}
        label={((customContent && customContent[type]) || {}).label || label}
        labelNode={((customContent && customContent[type]) || {}).labelNode}
        description={((customContent && customContent[type]) || {}).description}
        descriptionNode={((customContent && customContent[type]) || {}).descriptionNode}
    >
        {
            resume.volunteer.map((volunteerEntry, index) => {
                return <ResumeVolunteerEntry volunteerEntry={volunteerEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumeVolunteer.propTypes = {
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

ResumeVolunteer.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Volunteering",
    type: "volunteer"
};

export default ResumeVolunteer;
