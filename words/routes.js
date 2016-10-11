const actions = require("./actions");
const express = require("express");
const router = express.Router();

router.get("/", actions.getWords);

module.exports = router;
