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
            letter.recipient.title ? <p className="letter-recipient__title">{letter.recipient.title}</p> : null
        }
        {
            letter.recipient.company ? <p className="letter-recipient__company">{letter.recipient.company}</p> : null
        }
        {
            letter.recipient.streetAddress ?
                <p className="letter-recipient__street-address">{letter.recipient.streetAddress}</p> : null
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
