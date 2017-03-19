const concat = require("gulp-concat");
const copy = require("gulp-copy2");
const coveralls = require("gulp-coveralls");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const gutil = require("gulp-util");
const gulpIf = require("gulp-if");
const mocha = require("gulp-mocha");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const WebPack = require("webpack");

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task("eslint", () => {
	return gulp.src(["**/*.js", "!./venv/**/*", "!./node_modules/**/*", "!./dist/**/*", "!./coverage/**/*"])
		.pipe(eslint({fix: true}))
		.pipe(eslint.format())
		.pipe(gulpIf(isFixed, gulp.dest("./")))
		.pipe(eslint.failOnError());
});

gulp.task("lint", ["eslint"]);

gulp.task("test.unit", function () {
	return gulp.src("test/unit/**/*.js", {read: false})
		.pipe(mocha());
});

gulp.task("test.integration", function () {
	return gulp.src("test/integration/**/*.js", {read: false})
		.pipe(mocha());
});

gulp.task("test", ["test.unit", "test.integration"]);

gulp.task("copy", () => {
	return copy([
		{
			src: "public/assets/*",
			dest: "dist/"
		}
	]);
});

gulp.task("clean", (callback) => {
	del(["dist"], callback);
});

gulp.task("vendor", () => {
	return gulp.src([
		"node_modules/react-mdl/extra/material.min.js"
	])
		.pipe(sourcemaps.init())
		.pipe(concat("vendor.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
});
gulp.task("vendor:dev", () => {
	return gulp.src([
		"node_modules/react-mdl/extra/material.js"
	])
		.pipe(sourcemaps.init())
		.pipe(concat("vendor.js"))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
});

gulp.task("webpack", function (callback) {
	const webpackConfig = Object.create(require("./webpack.config"));
	webpackConfig.plugins.push(
		new WebPack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new WebPack.optimize.UglifyJsPlugin()
	);

	WebPack(webpackConfig, function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack:prod", err);
		}
		gutil.log("[webpack:prod]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("webpack:dev", (callback) => {
	let webpackConfig = Object.create(require("./webpack.config"));
	webpackConfig.devtool = "sourcemap";

	WebPack(webpackConfig, function(err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack:dev", err);
		}
		gutil.log("[webpack:dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("build", [
	"lint",
	"copy",
	"vendor",
	"webpack"
]);

gulp.task("build:dev", [
	"lint",
	"copy",
	"vendor:dev",
	"webpack:dev"
]);

gulp.task("coveralls", () => {
	return gulp.src("coverage/**/lcov.info")
		.pipe(coveralls());
});
