import PropTypes from "prop-types";
import React from "react";
import {LetterSection} from "../section";

export const LetterAddress = ({letter, contentConfiguration}) => {
    if (!letter.recipient) {
        return null;
    }

    return <LetterSection {...contentConfiguration.contentProps} type={contentConfiguration.contentKey}>
        {
            letter.recipient.name ? <p className="letter-recipient__name">{letter.recipient.name}</p> : null
        }
        {
            letter.recipient.jobTitle ? <p className="letter-recipient__title">{letter.recipient.jobTitle}</p> : null
        }
        {
            letter.recipient.worksFor ? <p className="letter-recipient__company">{letter.recipient.worksFor}</p> : null
        }
        {
            letter.recipient.address ?
                <p className="letter-recipient__street-address">{letter.recipient.address}</p> : null
        }
        {
            letter.recipient.city && letter.recipient.region ?
                <p className="letter-recipient__city-region">{letter.recipient.city}, {letter.recipient.region}</p> : null
        }
        {
            letter.recipient.postalCode ?
                <p className="letter-recipient__postal-code">{letter.recipient.postalCode}</p> : null
        }
    </LetterSection>;
};

LetterAddress.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
};

export default LetterAddress;
