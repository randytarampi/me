import {CampaignLink, PrintableFooter} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const LetterFooter = () => {
    const onlineUrl = `${__PUBLISHED_LETTER_URL__}`;
    return <PrintableFooter>
        <Row className="row valign-wrapper center-align hide-on-screen">
            <Col s={12}>
                <em>Check out (a generic copy of) this letter online at <CampaignLink
                    href={onlineUrl}>{onlineUrl}</CampaignLink></em>
            </Col>
        </Row>
        <Row className="row valign-wrapper center-align hide-on-print">
            <Col l={8} offset="l2">
                <p>If you're going to print this out please do it in Chrome, or with a Chromium backed
                    client — I didn't work on those print styles for nothing!</p>
                <p>It should fit neatly onto a single A4, US Letter, or US Legal sized page, provided you <em>set
                    the margins to nil</em>, <em>clear the page headers and footers</em>, and for best results, <em>include
                    background colours and images</em></p>
            </Col>
        </Row>
    </PrintableFooter>;
};

LetterFooter.propTypes = {
    letter: PropTypes.object.isRequired
};

export default LetterFooter;
