import {castDatePropertyToDateTime} from "@randy.tarampi/js";
import {PrintableSection} from "@randy.tarampi/jsx";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React from "react";

export const LetterDate = ({contentConfiguration}) => {
    const date = contentConfiguration.contentProps && contentConfiguration.contentProps.date
        ? castDatePropertyToDateTime(contentConfiguration.contentProps.date)
        : DateTime.local();

    return <PrintableSection
        {...contentConfiguration.contentProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        <p className="letter-date__date-string">
            {
                date.toLocaleString(DateTime.DATE_FULL)
            }
        </p>
    </PrintableSection>;
};

LetterDate.propTypes = {
    contentConfiguration: PropTypes.object.isRequired
};

export default LetterDate;
