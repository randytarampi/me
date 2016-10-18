const express = require("express");
const router = express.Router();

router.use("/instagram", require("./instagram/routes"));

module.exports = router;
