import PropTypes from "prop-types";
import React from "react";
import {Helmet} from "react-helmet";
import LetterJson from "../../../letter.json";
import LetterFooter from "./footer";
import LetterHeader from "./header";

export const Letter = props => <div className="letter">
    <Helmet>
        <title>{props.letter.basics.name} &mdash; {props.letter.basics.label}</title>
        <meta itemProp="name" content={props.letter.basics.name}/>
        <meta name="twitter:title" content={props.letter.basics.name}/>
        <meta name="og:title" content={props.letter.basics.name}/>
        <meta name="og:site_name" content={props.letter.basics.name}/>
        <meta name="description" content={props.letter.basics.label}/>
        <meta itemProp="description" content={props.letter.basics.label}/>
        <meta name="twitter:description" content={props.letter.basics.label}/>
        <meta name="og:description" content={props.letter.basics.label}/>
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
        <link rel="canonical" href={props.letter.publish_url}/>
        <meta name="og:url" content={props.letter.publish_url}/>
    </Helmet>
    <LetterHeader {...props} />
    <div className="letter-content">
        <div className="container">
            {
                props.letter.content.map(contentConfiguration => {
                    const ContentComponent = contentConfiguration.component
                        ? contentConfiguration.component
                        : require(`./content/${contentConfiguration.contentKey}`).default;
                    return <ContentComponent
                        {...props}
                        contentConfiguration={contentConfiguration}
                        key={contentConfiguration.sectionId || contentConfiguration.contentKey}
                    />;
                })
            }
        </div>
    </div>
    <LetterFooter {...props} />
</div>;

Letter.propTypes = {
    letter: PropTypes.object.isRequired
};

Letter.defaultProps = {
    letter: LetterJson
};

export default Letter;
