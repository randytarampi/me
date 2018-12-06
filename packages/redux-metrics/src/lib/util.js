import {DateTime} from "luxon";

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

export const buildReduxActionEventDetails = (action, supplementaryDetails) => {
    return buildEventDetails({
        ...supplementaryDetails,
        type: action.type
    });
};
