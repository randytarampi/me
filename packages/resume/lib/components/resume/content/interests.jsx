import {Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

const {PrintableSection} = Printable;

export const ResumeInterests = ({resume}) => {
    return <PrintableSection printableType="resume" type="interests" label="Interests" showOnLegal={true}>
        <Row>
            {
                resume.interests.map((interestEntry, index) => {
                    return <Col m={4} s={6}
                                className={`resume-interests__interest-entry${index > 2 ? " hide-on-print" : ""}`}
                                key={index}>
                        <h5 className="resume-interests__interest">
                            <span className="text">{interestEntry.name}</span>
                        </h5>
                        {
                            interestEntry.keywords && interestEntry.keywords.length
                                ? <ul className="resume-interests__keywords">
                                    {
                                        interestEntry.keywords.map((keyword, index) => {
                                            return <li
                                                className={`resume-interests__keyword${index > 3 ? " show-on-legal" : ""}`}
                                                key={index}>
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
    </PrintableSection>;
};

ResumeInterests.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeInterests;
