import {RightDescriptionSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";

export const LetterSignature = ({letter, assetUrl, contentConfiguration}) => {
    const SectionComponent = contentConfiguration.contentProps.sectionComponent || RightDescriptionSection;

    return <SectionComponent
        {...contentConfiguration.sectionProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        {
            contentConfiguration.contentProps.valediction
                ? contentConfiguration.contentProps.valediction
                : <p className="letter-signature__content">Hope to hear from you soon,</p>
        }

        <img className="signature letter-signature__signature" alt={letter.basics.name}
             src={`${assetUrl}/signature.svg`}/>
    </SectionComponent>;
};

LetterSignature.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
    assetUrl: PropTypes.string.isRequired
};

LetterSignature.defaultProps = {
    assetUrl: __LETTER_ASSET_URL__
};

export default LetterSignature;
