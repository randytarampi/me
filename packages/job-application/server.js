require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const server = require("express");
const app = server();
app.use(server.static(path.resolve(require.resolve("@randy.tarampi/views"), "../../dist")));
module.exports = app.listen(config.get("letter.serverPort"));
