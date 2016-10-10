require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

const app = express();

/**
 * Set up universal middleware
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(favicon(path.join(__dirname, "public", "assets", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

/**
 * Set up routes
 */
app.use("/", require("./app/routes"));
app.use("/photos", require("./photos/routes"));

/**
 * Set up @see error404Handler
 */
app.use(error404Handler);

/**
 * @see developmentErrorHandler gets defined/invoked first as to display errors, as opposed to @see standardErrorHandler
 */
if (app.get("env") === "development") {
	app.use(developmentErrorHandler);
}

/**
 * @see standardErrorHandler will just eat the error and log it server side, as opposed to @see standardErrorHandler
 */
app.use(standardErrorHandler);


module.exports = app;


function error404Handler(req, res, next) {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
}

function developmentErrorHandler(err, req, res) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: err
	});
}

function standardErrorHandler(err, req, res) {
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {}
	});
}
