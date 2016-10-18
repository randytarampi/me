const actions = require("./actions");
const express = require("express");
const router = express.Router();

router.get("/", actions.authenticate);

router.get("/redirect", actions.handleRedirect);

module.exports = router;
