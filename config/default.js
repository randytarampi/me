const me = require("./me");

const POSTS_SERVER_PORT = 3006;
const RESUME_SERVER_PORT = 3004;
const LETTER_SERVER_PORT = 3002;

const WWW_APP_PORT = 8080;
const RESUME_APP_PORT = WWW_APP_PORT;
const LETTER_APP_PORT = WWW_APP_PORT;

const POSTS_DB_PORT = 8000;

module.exports = {
    gtm: "GTM-K26GTD2",
    crisp: "03689d2b-80ab-4f5d-90cb-a2de269ea9c3",
    sentryDsn: "https://5f246bd3456d477da7ebf2d4fd06f2bb@sentry.io/1240735",
    resume: {
        expectations: {
            pages: 1,
        },
        publishUrl: `http://localhost:${RESUME_APP_PORT}`,
        assetUrl: "",
        appPort: RESUME_APP_PORT,
        serverPort: RESUME_SERVER_PORT
    },
    letter: {
        expectations: {
            pages: 1,
        },
        publishUrl: `http://localhost:${LETTER_APP_PORT}`,
        assetUrl: "",
        appPort: LETTER_APP_PORT,
        serverPort: LETTER_SERVER_PORT
    },
    posts: {
        photosUrl: `http://localhost:${POSTS_SERVER_PORT}/posts?type=Photo`,
        postsUrl: `http://localhost:${POSTS_SERVER_PORT}/posts`,
        wordsUrl: `http://localhost:${POSTS_SERVER_PORT}/posts?type=Post`,
        resumeUrl: "/api/resume",
        letterUrl: "/api/letter",
        serverPort: POSTS_SERVER_PORT,
        dbPort: POSTS_DB_PORT
    },
    www: {
        codeUrl: "/code",
        photosUrl: "/photos",
        postsUrl: "/blog",
        wordsUrl: "/words",
        resumeUrl: "/resume",
        letterUrl: "/letter",
        publishUrl: `http://localhost:${WWW_APP_PORT}`,
        assetUrl: "",
        appPort: WWW_APP_PORT
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
