import PropTypes from "prop-types";
import React from "react";
import ResumeSection from "../section";
import ResumeAwardsEntry from "./entry";

export const ResumeAwards = ({resume}) => {
    return <ResumeSection type="awards" label="Awards">
        {
            resume.awards.map((awardsEntry, index) => {
                return <ResumeAwardsEntry awardsEntry={awardsEntry} key={index} index={index}/>;
            })
        }
    </ResumeSection>;
};

ResumeAwards.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeAwards;
