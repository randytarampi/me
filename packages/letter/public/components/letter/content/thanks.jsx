import PropTypes from "prop-types";
import React from "react";
import {LetterSection} from "../section";

export const LetterThanks = ({letter, contentConfiguration}) => {
    return <LetterSection {...contentConfiguration.contentProps} type={contentConfiguration.contentKey}>
        <p className="letter-thanks__content">
            {
                contentConfiguration.contentProps.thanks || "I hope I didn't waste your time – even if I'm not a match for you folks I hope that I brought a little bit of sunshine to your day wherever you are."
            }
        </p>
    </LetterSection>;
};

LetterThanks.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
};

export default LetterThanks;
