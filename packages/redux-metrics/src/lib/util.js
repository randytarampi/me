// @ts-check
import {DateTime} from "luxon";

/**
 * Build the default event payload.
 * @param {object} [details={}] - Extra event fields.
 * @returns {object} The event payload.
 */
export const buildEventDetails = details => {
    const dateTime = DateTime.utc();
    return {
        name: "",
        value: "",
        type: "",
        ...details,
        timestamp: dateTime.valueOf(),
        dateTime: dateTime.toISO()
    };
};

/**
 * Build an event payload for a Redux action.
 * @param {{type: string}} action - The Redux action.
 * @param {object} [supplementaryDetails={}] - Extra event fields.
 * @returns {object} The event payload.
 */
export const buildReduxActionEventDetails = (action, supplementaryDetails) => {
    return buildEventDetails({
        ...supplementaryDetails,
        type: action.type
    });
};
