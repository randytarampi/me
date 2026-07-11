require("@randy.tarampi/jsx/src/lib/reactShim.js");
const {JSDOM} = require("jsdom");
require("mock-local-storage");
const {readFileSync} = require("fs");

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

const jsdom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
global.window = jsdom.window;
global.document = jsdom.window.document;
Object.defineProperty(global, "navigator", {
    configurable: true,
    writable: true,
    value: {userAgent: "node.js"}
});
global.location = jsdom.window.location;

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
global.window.$crisp = [];