/**
 * @function Sort two [Photos]{@link Photo} by width, ascending.
 * @param a {Photo}
 * @param b {Photo}
 * @returns {number}
 */
export const sortPhotosByWidth = (a, b) => {
    if (a.width < b.width) {
        return -1;
    } else if (a.width > b.width) {
        return 1;
    } else {
        return 0;
    }
};

export default sortPhotosByWidth;
