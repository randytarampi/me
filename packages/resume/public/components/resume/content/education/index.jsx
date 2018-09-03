import {Printable} from "@randy.tarampi/jsx";
import Link from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import ResumeEducationEntry from "./entry";

const {PrintableSection} = Printable;

export const ResumeEducation = ({resume}) => {
    return <PrintableSection
        printableType="resume"
        type="education"
        label="Education"
        descriptionNode={
            <Fragment>
                <p><span className="text">I went to school on top of a mountain for 5 years</span></p>
                <p><span className="text">I remember some things better than others, like the snow days. For everything else there's <Link href="https://www.goodreads.com/book/show/29437996-copying-and-pasting-from-stack-overflow">StackOverflow</Link></span></p>
            </Fragment>
        }
    >
        {
            resume.education.map((educationEntry, index) => {
                return <ResumeEducationEntry educationEntry={educationEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumeEducation.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeEducation;
