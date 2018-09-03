import {Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import ResumeVolunteerEntry from "./entry";

const {PrintableSection} = Printable;

export const ResumeVolunteer = ({resume}) => {
    return <PrintableSection
        printableType="resume"
        type="volunteer"
        label="Volunteering"
        hideOnPrint={true}
        descriptionNode={
            <Fragment>
                <p><span className="text">I never really <em>want</em> to volunteer, but when it happens it seems that I really enjoy it</span>
                </p>
                <p><span className="text">People always looked at me as a shy and reserved, but it actually turns out that I've got a knack for leadership and mentorship</span>
                </p>
            </Fragment>
        }
    >
        {
            resume.volunteer.map((volunteerEntry, index) => {
                return <ResumeVolunteerEntry volunteerEntry={volunteerEntry} key={index} index={index}/>;
            })
        }
    </PrintableSection>;
};

ResumeVolunteer.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeVolunteer;
