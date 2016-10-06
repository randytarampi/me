const actions = require("./actions");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/_hc", actions.serveReadme);

module.exports = router;
