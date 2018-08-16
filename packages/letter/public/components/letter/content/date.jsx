import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React from "react";
import {LetterSection} from "../section";

export const LetterDate = ({contentConfiguration}) => {
    const date = contentConfiguration.contentProps.date
        ? DateTime.fromISO(contentConfiguration.contentProps.date)
        : DateTime.local();

    return <LetterSection {...contentConfiguration.contentProps} type={contentConfiguration.contentKey}>
        <p className="letter-date__date-string">
            {
                date.toLocaleString(DateTime.DATE_FULL)
            }
        </p>
    </LetterSection>;
};

LetterDate.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
};

export default LetterDate;
