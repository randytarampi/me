import {Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";
import {Helmet} from "react-helmet";
import baseLetter from "../../../lib/baseLetter";
import LetterEntity from "../../../lib/letter";
import LetterFooter from "./footer";

const {PrintableHeader} = Printable;

export const Letter = ({letter, ...props}) => <div className="printable letter">
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
</div>;

Letter.propTypes = {
    letter: PropTypes.object.isRequired
};

Letter.defaultProps = {
    letter: LetterEntity.fromJSON(baseLetter)
};

export default Letter;
