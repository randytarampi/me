import PropTypes from "prop-types";
import React from "react";
import ResumeSection from "../section";
import ResumeWorkEntry from "./entry";

export const ResumeWork = ({resume}) => {
    return <ResumeSection type="work" label="Work">
        {
            resume.work.map((workEntry, index) => {
                return <ResumeWorkEntry workEntry={workEntry} key={index} index={index}/>;
            })
        }
    </ResumeSection>;
};

ResumeWork.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeWork;
