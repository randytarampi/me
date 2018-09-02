/* global global */

import {JSDOM} from "jsdom";
import packageJson from "../package.json";

const jsdom = new JSDOM();
global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = {
    userAgent: "node.js"
};

global.window.NAME = packageJson.name;
global.window.VERSION = packageJson.version;
global.window.ENVIRONMENT = process.env.NODE_ENV;
global.window.SENTRY_DSN = "https://meow@sentry.io/woof";
global.window.LOGGER = {
    level: "trace",
    streams: {
        console: true
    }
};
