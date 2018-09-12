import {CampaignLink, PrintableFooter} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const ResumeFooter = () => {
    return <PrintableFooter>
        <Row className="row valign-wrapper center-align hide-on-screen">
            <Col s={12}>
                <em>Print styles are hard to write and one page résumés are harder – check out the full copy
                    at <CampaignLink href={__PUBLISHED_RESUME_URL__}/></em>
            </Col>
        </Row>
        <Row className="row valign-wrapper center-align hide-on-print">
            <Col l={8} offset="l2">
                <p>If you're going to print this out please do it in Chrome, or with a Chromium backed
                    client &mdash; I didn't work on those print styles for nothing!</p>
                <p>It should fit neatly onto a single <CampaignLink
                    href="https://github.com/randytarampi/me.resume/raw/master/a4.pdf">A4</CampaignLink>, <CampaignLink
                    href="https://github.com/randytarampi/me.resume/raw/master/letter.pdf">US Letter</CampaignLink>,
                    or <CampaignLink
                        href="https://github.com/randytarampi/me.resume/raw/master/legal.pdf">US
                        Legal</CampaignLink> sized
                    page, provided you <em>set the margins to nil</em>, <em>clear the page headers and footers</em>,
                    and for best results, <em>include background colours and images</em></p>
            </Col>
        </Row>
    </PrintableFooter>;
};

ResumeFooter.propTypes = {
    resume: PropTypes.object.isRequired
};

export default ResumeFooter;
