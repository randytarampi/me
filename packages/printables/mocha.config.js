module.exports = {
    globals: ["expect"],
    sort: true,
    fullTrace: true,
    checkLeaks: true,
    require: ["../../babel.register.js", "./test/01_setup", "./test/02_import-all"],
    exit: true,
    reporter: process.env.CI ? "mocha-junit-reporter" : "spec",
    reporterOptions: {
        testsuitesTitle: true,
        testCaseSwitchClassnameAndName: true,
        suiteTitleSeparatedBy: ".",
        properties: {
            LANG: process.env.LANG,
            USER: process.env.USER,
            CI: process.env.CI,
            CPU_ARCH: process.env.CPU_ARCH,
            OS_NAME: process.env.OS_NAME,
            NODE_VERSION: process.env.NODE_VERSION,
            NODE_ENV: process.env.NODE_ENV,
            TRIGGER: process.env.EVENT_TYPE,
            REPO_SLUG: process.env.REPO_SLUG,
            BRANCH: process.env.BRANCH,
            COMMIT_SHA: process.env.COMMIT,
            COMMIT_MESSAGE: process.env.COMMIT_MESSAGE,
            BUILD_NUMBER: process.env.BUILD_NUMBER,
            BUILD_WEB_URL: process.env.BUILD_WEB_URL,
            JOB_NUMBER: process.env.JOB_NUMBER,
            JOB_WEB_URL: process.env.JOB_WEB_URL,
        }
    }
};
