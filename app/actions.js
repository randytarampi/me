const fs = require("fs");
const path = require("path");

const actions = {};

actions.serveReadme = (req, res) => {
	res.send(fs.readFileSync(path.join(__dirname, "..", "README.md")).toString());
};

module.exports = actions;
