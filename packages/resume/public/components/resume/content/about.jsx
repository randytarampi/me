import PropTypes from "prop-types";
import React from "react";
import ResumeSection from "./section";

export const ResumeAbout = ({resume}) => {
    return <ResumeSection type="about" label="About" hideOnPrint={true}>
        <p className="resume-about__summary">
            {resume.basics.summary}
        </p>
    </ResumeSection>;
};

ResumeAbout.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeAbout;
