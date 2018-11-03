import {PrintableSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";

export const PrintableRecipient = ({letter, contentConfiguration}) => {
    if (!letter.recipient) {
        return null;
    }

    const companyName = letter.recipient.worksFor && typeof letter.recipient.worksFor === "object"
        ? letter.recipient.worksFor.name
        : letter.recipient.worksFor;

    return <PrintableSection
        {...contentConfiguration.contentProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        {
            letter.recipient.name
                ? <p className="printable-recipient__name">{letter.recipient.name}</p>
                : null
        }
        {
            letter.recipient.jobTitle
                ? <p className="printable-recipient__title">{letter.recipient.jobTitle}</p>
                : null
        }
        {
            letter.recipient.worksFor
                ? <p className="printable-recipient__company">{companyName}</p>
                : null
        }
        {
            letter.recipient.address && letter.recipient.city && letter.recipient.postalCode
                ? <Fragment>
                    <p className="printable-recipient__street-address">{letter.recipient.address}</p>
                    {letter.recipient.postOfficeBoxNumber ?
                        <p className="printable-recipient__post-office-box-number">{letter.recipient.postOfficeBoxNumber}</p> : null}
                    <p className="printable-recipient__city-region">{[letter.recipient.city, letter.recipient.region].filter(lineItem => !!lineItem).join(", ")}</p>
                    {letter.recipient.postalCode ?
                        <p className="printable-recipient__postal-code">{letter.recipient.postalCode}</p> : null}
                </Fragment>
                : null
        }
    </PrintableSection>;
};

PrintableRecipient.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired
};

export default PrintableRecipient;
