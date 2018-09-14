const profiles = require("./profiles");

const mapProfileToResumeProfile = (network, profile) => {
    return Object.assign({network}, profile);
};

const buildResumeProfilesByName = (namedProfiles = Object.keys(profiles)) => {
    return namedProfiles.reduce((selectedProfiles, profileName) => selectedProfiles.concat(mapProfileToResumeProfile(profileName, profiles[profileName])), []);
};

module.exports = {
    mapProfileToResumeProfile,
    buildResumeProfilesByName
};
