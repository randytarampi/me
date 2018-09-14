const me = require("./me");

module.exports = {
    gtm: "GTM-K26GTD2",
    sentryDsn: "https://5f246bd3456d477da7ebf2d4fd06f2bb@sentry.io/1240735",
    resume: {
        publishUrl: "https://www.randytarampi.ca/resume"
    },
    letter: {
        publishUrl: "https://www.randytarampi.ca/letter"
    },
    posts: {
        photosUrl: "http://localhost:3006/posts?type=Photo",
        postsUrl: "http://localhost:3006/posts",
        wordsUrl: "http://localhost:3006/posts?type=Post",
        resumeUrl: "/api/resume",
        letterUrl: "/api/letter"
    },
    www: {
        codeUrl: "/code",
        photosUrl: "/photos",
        postsUrl: "/blog",
        wordsUrl: "/words",
        resumeUrl: "/resume",
        letterUrl: "/letter",
        assetUrl: "http://localhost:8080"
    },
    logger: {
        enabled: true,
        streams: {
            stdout: false,
            sentry: false,
            human: true,
            console: true
        },
        level: "trace",
        src: true
    },
    me
};
