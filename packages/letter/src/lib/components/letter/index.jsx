import {CampaignContext, LoadingSpinner, PrintableHeader} from "@randy.tarampi/jsx";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {Container} from "react-materialize";
import LetterFooter from "./footer";

export class LetterComponent extends Component {
    componentDidMount() {
        if (this.props.variant) {
            this.props.fetchLetter(this.props.variant);
        }
    }

    render() {
        const {letter, isLoading, fetchLetter, match, ...props} = this.props; // eslint-disable-line no-unused-vars

        return <div className="printable letter">
            {
                isLoading || !letter
                    ? <LoadingSpinner/>
                    : <CampaignContext.Provider value={letter.renderOptions && letter.renderOptions.toJS()}>
                        <Helmet>
                            <title>{`${letter.basics.name} — Hire me`}</title>
                            <link rel="canonical" href={__PUBLISHED_LETTER_URL__}/>
                            <meta name="og:url" content={__PUBLISHED_LETTER_URL__}/>
                        </Helmet>
                        <SchemaJsonLdComponent markup={letter.toSchema()}/>
                        <PrintableHeader {...props} printable={letter}/>
                        <div className="letter-content">
                            <Container>
                                {
                                    letter.content.map(contentConfiguration => {
                                        const ContentComponent = contentConfiguration.component
                                            ? contentConfiguration.component
                                            : require(`./content/${contentConfiguration.contentKey}`).default;
                                        return <ContentComponent
                                            {...props}
                                            letter={letter}
                                            contentConfiguration={contentConfiguration}
                                            key={contentConfiguration.sectionId || contentConfiguration.contentKey}
                                        />;
                                    })
                                }
                            </Container>
                        </div>
                        <LetterFooter {...props} letter={letter}/>
                    </CampaignContext.Provider>
            }
        </div>;
    }
}

LetterComponent.propTypes = {
    isLoading: PropTypes.bool,
    letter: PropTypes.object,
    fetchLetter: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

LetterComponent.defaultProps = {
    isLoading: false
};

export default LetterComponent;
