import {
    CampaignContext,
    ConnectedErrorWrapper,
    ErrorENOACCESSContentComponent,
    ErrorESERVERContentComponent,
    LoadingSpinner,
    mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContent,
    PrintableHeader
} from "@randy.tarampi/jsx";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Helmet} from "react-helmet";
import {Container} from "react-materialize";
import LetterFooter from "./footer";

export const mapLetterErrorCodeToErrorContentComponent = errorCode => {
    switch (errorCode) {
        case "EFETCH":
        case "ESERVER":
            return ErrorESERVERContentComponent;

        case "ENOLETTER":
            return ErrorENOACCESSContentComponent;

        default:
            return defaultMapErrorCodeToErrorContent(errorCode);
    }
};

export class LetterComponent extends PureComponent {
    componentDidMount() {
        if (this.props.variant) {
            this.props.fetchLetter(this.props.variant);
        }
    }

    render() {
        const {letter, isLoading, publishedLetterUrl, fetchLetter, match, ...props} = this.props; // eslint-disable-line no-unused-vars
        const contentProps = {
            ...props,
            publishedLetterUrl,
            letter
        };

        return <div className="printable letter">
            {
                isLoading || !letter
                    ? <LoadingSpinner/>
                    : <CampaignContext.Provider value={letter.renderOptions && letter.renderOptions.toJS()}>
                        <ConnectedErrorWrapper
                            key="letter-error-wrapper"
                            mapErrorCodeToErrorContentComponent={mapLetterErrorCodeToErrorContentComponent}
                        >
                            <Helmet>
                                <title>{`${letter.basics.name} — Hire me`}</title>
                                <link rel="canonical" href={publishedLetterUrl}/>
                                <meta name="og:url" content={publishedLetterUrl}/>
                            </Helmet>
                            <SchemaJsonLdComponent markup={letter.toSchema()}/>
                            <PrintableHeader {...contentProps} printable={letter}/>
                            <div className="letter-content">
                                <Container>
                                    {
                                        letter.content.map(contentConfiguration => {
                                            const ContentComponent = contentConfiguration.component
                                                ? contentConfiguration.component
                                                : require(`./content/${contentConfiguration.contentKey}`).default;
                                            return <ContentComponent
                                                {...contentProps}
                                                contentConfiguration={contentConfiguration}
                                                key={contentConfiguration.sectionId || contentConfiguration.contentKey}
                                            />;
                                        })
                                    }
                                </Container>
                            </div>
                            {
                                letter.footer.component
                                    ? <letter.footer.component contentConfiguration={letter.footer} {...contentProps}/>
                                    : <LetterFooter contentConfiguration={letter.footer} {...contentProps}/>
                            }
                        </ConnectedErrorWrapper>
                    </CampaignContext.Provider>
            }
        </div>;
    }
}

LetterComponent.propTypes = {
    isLoading: PropTypes.bool,
    letter: PropTypes.object,
    variant: PropTypes.string,
    fetchLetter: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    publishedLetterUrl: PropTypes.string.isRequired
};

LetterComponent.defaultProps = {
    isLoading: false,
    publishedLetterUrl: __PUBLISHED_LETTER_URL__
};

export default LetterComponent;
