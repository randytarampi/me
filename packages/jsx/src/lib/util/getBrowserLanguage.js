// @ts-check
/** @returns {string} The browser language, or `en` if there isn't one. */
export const getBrowserLanguage = () => navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language || "en";

export default getBrowserLanguage;
