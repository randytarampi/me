import PropTypes from "prop-types";
import React from "react";

export const ResumeTitle = ({resume}) =>
    <title>
        ${resume.basics.name} &emdash; ${resume.basics.label}
    </title>;

ResumeTitle.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeTitle;
