const actions = require("./actions");
const middleware = require("./middleware");
const express = require("express");
const router = express.Router();

router.get("/", middleware.parsePhotoSearchParams, actions.searchPhotos);

module.exports = router;
