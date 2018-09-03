import {Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";

const {PrintableSection} = Printable;

export const PrintableRecipient = ({letter, contentConfiguration}) => {
    if (!letter.recipient) {
        return null;
    }

    return <PrintableSection
        {...contentConfiguration.contentProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        {
            letter.recipient.name ? <p className="printable-recipient__name">{letter.recipient.name}</p> : null
        }
        {
            letter.recipient.jobTitle ? <p className="printable-recipient__title">{letter.recipient.jobTitle}</p> : null
        }
        {
            letter.recipient.worksFor ?
                <p className="printable-recipient__company">{letter.recipient.worksFor}</p> : null
        }
        {
            letter.recipient.address ?
                <p className="printable-recipient__street-address">{letter.recipient.address}</p> : null
        }
        {
            letter.recipient.city && letter.recipient.region ?
                <p className="printable-recipient__city-region">{letter.recipient.city}, {letter.recipient.region}</p> : null
        }
        {
            letter.recipient.postalCode ?
                <p className="printable-recipient__postal-code">{letter.recipient.postalCode}</p> : null
        }
    </PrintableSection>;
};

PrintableRecipient.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
};

export default PrintableRecipient;
