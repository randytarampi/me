import Link from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeFooter = () => {
    return <footer id="footer" className="resume-footer">
        <div className="container">
            <Row className="row valign-wrapper center-align resume-footer hide-on-screen">
                <Col s={12}>
                    <em>Print styles are hard to write and one page résumés are harder – check out the full copy
                        at <Link
                        href={__PUBLISHED_RESUME_URL__}>{__PUBLISHED_RESUME_URL__}</Link></em>
                </Col>
            </Row>
            <Row className="row valign-wrapper center-align resume-footer hide-on-print">
                <Col l={8} offset="l2">
                    <p>If you're going to print this out please do it in Chrome, or with a Chromium backed
                        client &mdash; I didn't work on those print styles for nothing!</p>
                    <p>It should fit neatly onto a single <Link
                        href="https://github.com/randytarampi/me.resume/raw/master/a4.pdf">A4</Link>, <Link
                        href="https://github.com/randytarampi/me.resume/raw/master/letter.pdf">US Letter</Link>,
                        or <Link
                            href="https://github.com/randytarampi/me.resume/raw/master/legal.pdf">US Legal</Link> sized
                        page, provided you <em>set the margins to nil</em>, <em>clear the page headers and footers</em>,
                        and for best results, <em>include background colours and images</em></p>
                </Col>
            </Row>
        </div>
    </footer>;
};

ResumeFooter.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeFooter;
