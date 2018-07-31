import PropTypes from "prop-types";
import React from "react";
import ResumeSection from "../section";
import ResumeVolunteerEntry from "./entry";

export const ResumeVolunteer = ({resume}) => {
    return <ResumeSection type="volunteer" label="Volunteer">
        {
            resume.volunteer.map((volunteerEntry, index) => {
                return <ResumeVolunteerEntry volunteerEntry={volunteerEntry} key={index} index={index}/>;
            })
        }
    </ResumeSection>;
};

ResumeVolunteer.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeVolunteer;
