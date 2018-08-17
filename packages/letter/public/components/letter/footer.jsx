import Link from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const LetterFooter = ({letter}) => {
    const onlineUrl = `${__PUBLISHED_LETTER_URL__}/${letter.id}`;
    return <footer id="footer" className="letter-footer">
        <div className="container">
            <Row className="row valign-wrapper center-align letter-footer hide-on-screen">
                <Col s={12}>
                    <em>Check out this letter online at <Link href={onlineUrl}>{onlineUrl}</Link></em>
                </Col>
            </Row>
            <Row className="row valign-wrapper center-align letter-footer hide-on-print">
                <Col l={8} offset="l2">
                    <p>If you're going to print this out please do it in Chrome, or with a Chromium backed
                        client &mdash; I didn't work on those print styles for nothing!</p>
                    <p>It should fit neatly onto a single A4, US Letter, or US Legal sized page, provided you <em>set
                        the margins to nil</em>, <em>clear the page headers and footers</em>, and for best results, <em>include
                        background colours and images</em></p>
                </Col>
            </Row>
        </div>
    </footer>;
};

LetterFooter.propTypes = {
    letter: PropTypes.object.isRequired
};

export default LetterFooter;
