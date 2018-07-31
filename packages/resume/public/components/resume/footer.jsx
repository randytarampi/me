import Link from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeFooter = ({resume}) => {
    return <footer id="footer" className="resume-footer">
        <div className="container">
            <Row className="row valign-wrapper center-align resume-footer hide-on-screen">
                <Col s={12}>
                    <em>Print styles are hard to write, and one-pagers are harder – check out the full copy at <Link
                        href={resume.publish_url}/></em>
                </Col>
            </Row>
        </div>
    </footer>;
};

ResumeFooter.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeFooter;
