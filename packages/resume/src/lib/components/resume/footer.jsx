import {PrintableFooter} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Col, Row} from "react-materialize";
import {ResumeCustomContent} from "../../resumeCustomContent";

export const ResumeFooter = ({customContent}) => {
    return <PrintableFooter>
        {
            customContent.footer.body
            || <Fragment>
                <Row className="row valign-wrapper center-align hide-on-print">
                    <Col l={8} offset="l2">
                        <p>If you're going to print this out please do it in Chrome, or with a Chromium backed
                            client — I didn't work on those print styles for nothing!</p>
                        <p>It should fit neatly onto a single A4, US Letter, or US Legal sized page, provided you <em>set
                            the margins to nil</em>, <em>clear the page headers and footers</em>, and for best
                            results, <em>include background colours and images</em></p>
                    </Col>
                </Row>
            </Fragment>
        }
    </PrintableFooter>;
};

ResumeFooter.propTypes = {
    resume: PropTypes.object.isRequired,
    customContent: PropTypes.instanceOf(ResumeCustomContent).isRequired
};

ResumeFooter.defaultProps = {
    customContent: new ResumeCustomContent()
};

export default ResumeFooter;
