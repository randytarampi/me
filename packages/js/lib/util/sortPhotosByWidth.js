/**
 * @function Sort two [Photos]{@link Photo}s by width, ascending.
 * @param a {Photo}
 * @param b {Photo}
 * @returns {number}
 */
export default (a, b) => {
    if (a.width < b.width) {
        return -1;
    } else if (a.width > b.width) {
        return 1;
    } else {
        return 0;
    }
};
