const me = require("./me/index.cjs");

const POSTS_SERVER_PORT = 3006;
const RESUME_SERVER_PORT = 3004;
const LETTER_SERVER_PORT = 3002;

const WWW_APP_PORT = 8080;
const RESUME_APP_PORT = WWW_APP_PORT;
const LETTER_APP_PORT = WWW_APP_PORT;

const POSTS_DB_PORT = 8000;

module.exports = {
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
    gcp: {
        api: {
            key: ""
        }
    },
    resume: {
        // NOTE-RT: `sw`/`swInstaller` used to be `function () { return this.resume.bundle...; }`
        // computed properties, relying on an old node-config convention where function-valued
        // config entries were auto-evaluated as getters bound to the root config object. The
        // installed `config` version no longer does this, so those raw, un-invoked functions were
        // leaking through as webpack entry names. Both are self-referential to `name` in this same
        // object, so they're replaced here with their already-known, static equivalents.
        bundle: {
            name: "resume",
            sw: "resume.sw",
            swInstaller: "resume.sw.installer"
        },
        expectations: {
            pages: 1,
        },
        publishUrl: `http://localhost:${RESUME_APP_PORT}`,
        assetUrl: "",
        appPort: RESUME_APP_PORT,
        serverPort: RESUME_SERVER_PORT
    },
    letter: {
        // NOTE-RT: see the identical note on `resume.bundle` above.
        bundle: {
            name: "letter",
            sw: "letter.sw",
            swInstaller: "letter.sw.installer"
        },
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
        // NOTE-RT: see the identical note on `resume.bundle` above.
        bundle: {
            name: "www",
            sw: "www.sw",
            swInstaller: "www.sw.installer"
        },
        codeUrl: "/code",
        photosUrl: "/photos",
        postsUrl: "/blog",
        mapUrl: "/map",
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
