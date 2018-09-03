import {Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";

const {PrintableSection} = Printable;

export const ResumeAbout = ({resume}) => {
    return <PrintableSection printableType="resume" type="about" label="About">
        <p className="resume-about__summary">
            {resume.basics.summary}
        </p>
    </PrintableSection>;
};

ResumeAbout.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeAbout;
