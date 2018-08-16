import {EmailLink, TelLink, WebLink} from "@randy.tarampi/jsx/lib/components/link";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";

export const LetterHeader = ({letter}) => {
    return <header id="header" className="letter-header">
        <div className="container">
            <Row className="valign-wrapper">
                <Col s={3}>
                    {
                        letter.basics.picture
                            ? <img className="letter-header__picture" src={letter.basics.picture}
                                   alt={letter.basics.name}/>
                            : null
                    }
                </Col>
                <Col s={9}>
                    <h1 className="letter-header__name">
                        <span className="text">{letter.basics.name}</span>
                    </h1>

                    <h3 className="letter-header__label hide-on-print">
                        {letter.basics.label}
                    </h3>
                    <div className="letter-header__contact">
                        <Row className="valign-wrapper hide-on-screen">
                            <Col s={6} className="letter-header__email">
                                <EmailLink email={letter.basics.email}/>
                            </Col>
                            <Col s={6} className="letter-header__tel">
                                <TelLink tel={letter.basics.phone}/>
                            </Col>
                        </Row>
                        {
                            letter.basics.website || letter.basics.location && letter.basics.location.address
                                ? <Row className="valign-wrapper hide-on-screen">
                                    {
                                        letter.basics.website
                                            ? <Col m={6} s={12} className="letter-header__web">
                                                <WebLink href={letter.basics.website}/>
                                            </Col>
                                            : null
                                    }
                                    {
                                        letter.basics.location && letter.basics.location.city
                                            ? <Col m={6} s={12} className="letter-header__location">
                                                <span><i
                                                    className="fas fa-map-marker-alt"></i>&nbsp;{letter.basics.location.city}, {letter.basics.location.region}, {letter.basics.location.countryCode}</span>
                                            </Col>
                                            : null
                                    }
                                </Row>
                                : null
                        }

                    </div>
                </Col>
            </Row>
        </div>
    </header>;
};

LetterHeader.propTypes = {
    letter: PropTypes.object.isRequired
};

export default LetterHeader;
