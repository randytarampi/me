import {createRequire} from "module";
import path from "path";

const require = createRequire(import.meta.url);
require("../../babel.register.cjs");
const __dirname = import.meta.dirname;
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const server = require("express");
const app = server();
app.use(server.static(path.join(__dirname, "dist")));
export default app.listen(config.get("letter.serverPort"));
