import PropTypes from "prop-types";
import React from "react";
import {Col} from "react-materialize";

export const ResumeSkillsEntry = ({skillsEntry, index}) => {
    return <Col m={4} s={6} className={`resume-skills-entry${index > 2 ? " hide-on-print" : ""}`}>
        <div className="resume-skills-entry__name">
            <h5><span className="text">{skillsEntry.name}</span></h5>
        </div>
        {
            skillsEntry.keywords && skillsEntry.keywords.size
                ? <ul className="resume-skills-entry__keywords">
                    {
                        skillsEntry.keywords.map((keyword, index) => {
                            return <li className={`resume-skills-entry__keyword${index > 5 ? " hide-on-print" : ""}`} key={index}>
                                {keyword}
                            </li>;
                        })
                    }
                </ul>
                : null
        }
    </Col>;
};

ResumeSkillsEntry.propTypes = {
    index: PropTypes.number,
    skillsEntry: PropTypes.object.isRequired
};

export default ResumeSkillsEntry;
