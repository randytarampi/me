require("../../babel.register.js");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const express = require("express");
const app = express();
app.use(express.static(`${__dirname}/dist`));
module.exports = app.listen(3000);
