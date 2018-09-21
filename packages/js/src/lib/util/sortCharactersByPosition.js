/**
 * @function Sort two [Characters]{@link Character} by position, ascending.
 * @param a {Character}
 * @param b {Character}
 * @returns {number}
 */
export const sortCharactersByPosition = (a, b) => {
    if (a.position < b.position) {
        return -1;
    } else if (a.position > b.position) {
        return 1;
    } else {
        return 0;
    }
};

export default sortCharactersByPosition;
