import {LoadingSpinner, PrintableHeader} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Component, Fragment} from "react";
import {Helmet} from "react-helmet";
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
                    : <Fragment>
                        <Helmet>
                            <link rel="canonical" href={__PUBLISHED_LETTER_URL__}/>
                            <meta name="og:url" content={__PUBLISHED_LETTER_URL__}/>
                        </Helmet>
                        <PrintableHeader {...props} printable={letter}/>
                        <div className="letter-content">
                            <div className="container">
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
                            </div>
                        </div>
                        <LetterFooter {...props} letter={letter}/>
                    </Fragment>
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
    isLoading: false,
};

export default LetterComponent;
