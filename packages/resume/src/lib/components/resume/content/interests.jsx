import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import {ResumeCustomContent} from "../../../resumeCustomContent";

export const ResumeInterests = ({resume, customContent, type, label}) => {
    return <PrintableSection
        printableType="resume"
        showOnLegal={true}
        type={type}
        label={customContent[type].label || label}
        labelNode={customContent[type].labelNode}
        description={customContent[type].description}
        descriptionNode={customContent[type].descriptionNode}
    >
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
                            interestEntry.keywords && interestEntry.keywords.size
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
    resume: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    customContent: PropTypes.object.isRequired
};

ResumeInterests.defaultProps = {
    customContent: new ResumeCustomContent(),
    label: "Interests",
    type: "interests"
};
export default ResumeInterests;
