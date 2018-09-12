import {CampaignLink, PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import ResumeEducationEntry from "./entry";

export const ResumeEducation = ({resume}) => {
    return <PrintableSection
        printableType="resume"
        type="education"
        label="Education"
        descriptionNode={
            <Fragment>
                <p><span className="text">I went to school on top of a mountain for 5 years</span></p>
                <p><span className="text">I remember some things better than others, like the snow days. For everything else there's <CampaignLink
                    href="https://www.goodreads.com/book/show/29437996-copying-and-pasting-from-stack-overflow">StackOverflow</CampaignLink></span>
                </p>
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
