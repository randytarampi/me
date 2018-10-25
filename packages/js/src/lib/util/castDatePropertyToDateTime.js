import {DateTime} from "luxon";

/**
 * @function Cast some representation of a `Date` to a `DateTime`
 * @param needsToBeCastToDateTimeOrNull {Character}
 * @returns {DateTime}
 */
export const castDatePropertyToDateTime = needsToBeCastToDateTimeOrNull => {
    if (needsToBeCastToDateTimeOrNull instanceof DateTime) {
        return needsToBeCastToDateTimeOrNull;
    } else if (typeof needsToBeCastToDateTimeOrNull === "string") {
        return DateTime.fromISO(needsToBeCastToDateTimeOrNull);
    } else if (typeof needsToBeCastToDateTimeOrNull === "number") {
        return DateTime.fromMillis(needsToBeCastToDateTimeOrNull);
    } else if (needsToBeCastToDateTimeOrNull instanceof Date) {
        return DateTime.fromJSDate(needsToBeCastToDateTimeOrNull);
    }

    return null;
};
