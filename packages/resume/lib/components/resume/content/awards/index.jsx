import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import ResumeAwardsEntry from "./entry";

export const ResumeAwards = ({resume}) => {
    return <PrintableSection printableType="resume" type="awards" label="Awards">
        {
            resume.awards.map((awardsEntry, index) => {
                return <ResumeAwardsEntry awardsEntry={awardsEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumeAwards.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeAwards;
