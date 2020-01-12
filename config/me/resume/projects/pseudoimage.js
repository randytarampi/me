const me = require("../../organizations/me");

module.exports = {
    entity: me,
    name: "A pseudolocalizer, for images",
    description: "A CLI utility that takes your image assets and spits out a pseudolocalized version",
    highlights: [
        "Like with my text `Pseudolocalizer`, I wanted to leave a legacy at Yardi and replace a key part of our i18n testing infrastructure",
        "The original goal here was to replace our existing tooling that generated pseudolocalized image assets based on a small set of static images which was slow and repetitive. This dynamic solution generated fake images based directly off their real counterparts with a time savings of 30%",
        "Switching out our image transformation library to `sharp` would yield massive gains, but I mostly keep this current implementation just to goad myself into actually trying to improve `lwip`",
    ],
    keywords: [
        "node.js",
        "i18n",
        "l10n",
        "p7e",
        "image processing"
    ],
    startDate: "2016-09-16",
    roles: [
        "👨‍💻"
    ],
    type: "Application",
    url: "https://github.com/randytarampi/pseudoimage"
};
