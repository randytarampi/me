export const getBrowserLanguage = () => navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language || "en";

export default getBrowserLanguage;
