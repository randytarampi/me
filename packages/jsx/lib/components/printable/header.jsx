import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import {CampaignLink, EmailLink, TelLink} from "../link/index";

export const PrintableHeader = ({printable}) => {
    return <header id="header" className="printable-header">
        <div className="container">
            <Row className="valign-wrapper">
                <Col s={3}>
                    {
                        printable.basics.picture
                            ? <img className="printable-header__picture" src={printable.basics.picture}
                                   alt={printable.basics.name}/>
                            : null
                    }
                </Col>
                <Col s={9}>
                    <h1 className="printable-header__name">
                        <span className="text">{printable.basics.name}</span>
                    </h1>

                    <h3 className="printable-header__label hide-on-print">
                        {printable.basics.label}
                    </h3>
                    <div className="printable-header__contact">
                        <Row className="valign-wrapper hide-on-screen">
                            <Col s={6} className="printable-header__email">
                                <EmailLink email={printable.basics.email}/>
                            </Col>
                            <Col s={6} className="printable-header__tel">
                                <TelLink tel={printable.basics.phone}/>
                            </Col>
                        </Row>
                        {
                            printable.basics.website || printable.basics.location && printable.basics.location.address
                                ? <Row className="valign-wrapper hide-on-screen">
                                    {
                                        printable.basics.website
                                            ? <Col m={6} s={12} className="printable-header__web">
                                                <CampaignLink href={printable.basics.website} className="link--web"/>
                                            </Col>
                                            : null
                                    }
                                    {
                                        printable.basics.location && printable.basics.location.city
                                            ? <Col m={6} s={12} className="printable-header__location">
                                                <span><i
                                                    className="fas fa-map-marker-alt"></i>&nbsp;{printable.basics.location.address}, {printable.basics.location.city} {printable.basics.location.region}, {printable.basics.location.countryCode}</span>
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

PrintableHeader.propTypes = {
    printable: PropTypes.object.isRequired
};

export default PrintableHeader;
