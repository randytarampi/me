/**
 * Determine the number of decimal places for a given {number} per https://stackoverflow.com/questions/9553354/how-do-i-get-the-decimal-places-of-a-floating-point-number-in-javascript.
 * @param number {number} The number you want to determine the precision of.
 * @returns {number} The number of significant digits for the given number
 */
export const getNumericalPrecision = number => {
    if (!Number.isFinite(number)) {
        return 0;
    }

    let exponent = 1;
    let power = 0;

    while (Math.round(number * exponent) / exponent !== number) {
        exponent *= 10;
        power++;
    }

    return power;
};

export default getNumericalPrecision;
