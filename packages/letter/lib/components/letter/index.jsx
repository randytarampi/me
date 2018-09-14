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
                            <title>{letter.basics.name} &mdash; {letter.basics.label}</title>
                            <meta itemProp="name" content={letter.basics.name}/>
                            <meta name="twitter:title" content={letter.basics.name}/>
                            <meta name="og:title" content={letter.basics.name}/>
                            <meta name="og:site_name" content={letter.basics.name}/>
                            <meta name="description" content={letter.basics.label}/>
                            <meta itemProp="description" content={letter.basics.label}/>
                            <meta name="twitter:description" content={letter.basics.label}/>
                            <meta name="og:description" content={letter.basics.label}/>
                            <meta name="image" content="/ʕつ•ᴥ•ʔつ.svg"/>
                            <meta itemProp="image" content="/ʕつ•ᴥ•ʔつ.svg"/>
                            <meta name="twitter:image:src" content="/ʕつ•ᴥ•ʔつ.svg"/>
                            <meta name="og:image" content="/ʕつ•ᴥ•ʔつ.svg"/>
                            <meta name="twitter:site" content="@randytarampi"/>
                            <meta name="twitter:creator" content="@randytarampi"/>
                            <meta name="og:locale" content="en_CA"/>
                            <meta name="fb:admins" content="831915416"/>
                            <meta name="fb:app_id" content="1705404522846104"/>
                            <meta name="og:type" content="website"/>
                            <link rel="canonical" href={letter.publish_url}/>
                            <meta name="og:url" content={letter.publish_url}/>
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
