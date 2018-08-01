import PropTypes from "prop-types";
import React from "react";
import {Col} from "react-materialize";

export const ResumeSkillsEntry = ({skillsEntry}) => {
    return <Col s={6} className="resume-skills-entry">
        <div className="resume-skills-entry__name">
            <h5><span className="text">{skillsEntry.name}</span></h5>
        </div>
        {
            skillsEntry.keywords && skillsEntry.keywords.length
                ? <ul className="resume-skills-entry__keywords">
                    {
                        skillsEntry.keywords.map((keyword, index) => {
                            return <li className="resume-skills-entry__keyword" key={index}>
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
    skillsEntry: PropTypes.object.isRequired
};

export default ResumeSkillsEntry;
