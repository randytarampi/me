import {RightPushSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React from "react";

export const LetterSalutation = ({letter, contentConfiguration}) => {
    const greeting = contentConfiguration.contentProps.greeting || "Hello";
    const punctuation = contentConfiguration.contentProps.punctuation || ",";
    const name = contentConfiguration.contentProps.name || letter.recipient && letter.recipient.firstName;
    const salutation = contentConfiguration.contentProps.salutation
        ? contentConfiguration.contentProps.salutation
        : name
            ? `${greeting} ${name}${punctuation}`
            : "To whom it may concern,";

    return <RightPushSection
        {...contentConfiguration.contentProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        <h3 className="letter-salutation__content">{salutation}</h3>
    </RightPushSection>;
};

LetterSalutation.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired
};

export default LetterSalutation;
