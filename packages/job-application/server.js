import {createRequire} from "module";
import path from "path";
import {fileURLToPath} from "url";

const require = createRequire(import.meta.url);
require("../../babel.register.cjs");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const server = require("express");
const app = server();
app.use(server.static(path.resolve(require.resolve("@randy.tarampi/resume"), "../../dist")));
export default app.listen(config.get("letter.serverPort"));
