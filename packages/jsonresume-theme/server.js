require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const server = require("express");
const app = server();
app.use(server.static(`${__dirname}/dist`));
module.exports = app.listen(config.has("resume.serverPort") ? config.get("resume.serverPort") : 3000);
