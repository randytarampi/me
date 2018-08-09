require("../util/configureEnvironment");

module.exports = {
    getPhotos: require("./getPhotos").default,
    getWords: require("./getWords").default,
    getPosts: require("./getPosts").default,
    instagramAuthReturn: require("./instagramAuthReturn").default,
    instagramAuthRedirect: require("./instagramAuthRedirect").default
};
