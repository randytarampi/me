const me = require("./me");
const defer = require("config/defer").deferConfig;

const POSTS_SERVER_PORT = 3006;
const RESUME_SERVER_PORT = 3004;
const LETTER_SERVER_PORT = 3002;

const WWW_APP_PORT = 8080;
const RESUME_APP_PORT = WWW_APP_PORT;
const LETTER_APP_PORT = WWW_APP_PORT;

const POSTS_DB_PORT = 8000;

module.exports = {
    facebook: {
        app: {
            id: ""
        }
    },
    instagram: {
        app: {
            id: ""
        }
    },
    linkedIn: {
        app: {
            id: ""
        }
    },
    github: {
        app: {
            id: ""
        }
    },
    twitter: {
        app: {
            id: ""
        }
    },
    gtm: {
        container: {
            id: ""
        }
    },
    ga: {
        property: {
            id: ""
        }
    },
    mixpanel: {
        app: {
            id: ""
        }
    },
    crisp: {
        app: {
            id: ""
        }
    },
    sentry: {
        dsn: ""
    },
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
        feedUrl: `http://localhost:${POSTS_SERVER_PORT}/posts/feed.rss`,
        resumeUrl: "/api/resume",
        letterUrl: "/api/letter",
        serverPort: POSTS_SERVER_PORT,
        dbPort: POSTS_DB_PORT
    },
    www: {
        bundle: {
            name: "www",
            sw: defer(function () {
                return `${this.www.bundle.name}.sw`;
            }),
            swInstaller: defer(function () {
                return `${this.www.bundle.sw}.installer`;
            })
        },
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
