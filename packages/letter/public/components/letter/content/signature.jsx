import PropTypes from "prop-types";
import React from "react";
import {RightDescriptionSection} from "../section";

export const LetterSignature = ({letter, contentConfiguration}) => {
    return <RightDescriptionSection {...contentConfiguration.sectionProps} type={contentConfiguration.contentKey}>
        <p className="letter-signature__content">
            Hope to hear from you soon,
        </p>
        <img className="signature letter-signature__signature" alt={letter.basics.name}
             src={`${__ASSET_URL__}/signature.svg`}/>
    </RightDescriptionSection>;
};

LetterSignature.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
};

export default LetterSignature;
