import {createRequire} from "module";
import path from "path";

const require = createRequire(import.meta.url);
require("../../babel.register.cjs");
const __dirname = import.meta.dirname;
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const server = require("express");

const letterApp = server();
letterApp.use(server.static(path.join(path.dirname(require.resolve("@randy.tarampi/letter/package.json")), "dist")));
const letterServer = letterApp.listen(config.get("letter.serverPort"));

const resumeApp = server();
resumeApp.use(server.static(path.join(path.dirname(require.resolve("@randy.tarampi/resume/package.json")), "dist")));
const resumeServer = resumeApp.listen(config.get("resume.serverPort"));

export default {
    close: () => {
        letterServer.close();
        resumeServer.close();
    }
};
