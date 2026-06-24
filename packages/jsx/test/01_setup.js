import "../src/lib/reactShim";
import {JSDOM} from "jsdom";
import "mock-local-storage";
const packageJson = require("../package.json");

const jsdom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
global._jsdom = jsdom;
global.window = jsdom.window;
global.document = jsdom.window.document;
global.Image = jsdom.window.Image;
Object.defineProperty(global, "navigator", {
    configurable: true,
    writable: true,
    value: {userAgent: "node.js"}
});
global.location = jsdom.window.location;

const materializeInstance = {
    destroy() {},
    select() {},
    open() {},
    close() {},
    updateTabIndicator() {}
};

const materializeStub = new Proxy({}, {
    get() {
        return {
            init() {
                return materializeInstance;
            },
            getInstance() {
                return null;
            }
        };
    }
});

global.M = materializeStub;
global.window.M = materializeStub;

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
