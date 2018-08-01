import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import ResumeSection from "./section";

export const ResumeInterests = ({resume}) => {
    return <ResumeSection type="interests" label="Interests" hideOnPrint={true}>
        <Row>
            {
                resume.interests.map((interestEntry, index) => {
                    return <Col s={6} className="resume-interests__interest-entry" key={index}>
                        <h5 className="resume-interests__interest">
                            <span className="text">{interestEntry.name}</span>
                        </h5>
                        {
                            interestEntry.keywords && interestEntry.keywords.length
                                ? <ul className="resume-interests__keywords">
                                    {
                                        interestEntry.keywords.map((keyword, index) => {
                                            return <li className="resume-interests__keyword" key={index}>
                                                {keyword}
                                            </li>;
                                        })
                                    }
                                </ul>
                                : null
                        }
                    </Col>;
                })
            }
        </Row>
    </ResumeSection>;
};

ResumeInterests.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeInterests;
