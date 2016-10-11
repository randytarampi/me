const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const copy = require("gulp-copy2");
const coveralls = require("gulp-coveralls");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const gutil = require("gulp-util");
const gulpIf = require("gulp-if");
const istanbul = require("gulp-istanbul");
const minifyCss = require("gulp-minify-css");
const mocha = require("gulp-mocha");
const sass = require("gulp-sass");
const sassTildeImporter = require("grunt-sass-tilde-importer");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const WebPack = require("webpack");

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task("eslint", () => {
	return gulp.src(["**/*.js", "!./node_modules/**/*", "!./dist/**/*", "!./coverage/**/*"])
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
	del(["dist", "data/flickr"], callback);
});

gulp.task("styles", ["styles:dev"], () => {
	return gulp.src("dist/styles.css")
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
});

gulp.task("styles:dev", () => {
	return gulp.src([
			"node_modules/normalize.css/normalize.css",
			"styles/style.scss"
		])
		.pipe(sass({
			importer: sassTildeImporter
		}).on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(concat("styles.css"))
		.pipe(gulp.dest("dist"));
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
	var webpackConfig = Object.create(require("./webpack.config"));
	webpackConfig.plugins.push(
		new WebPack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new WebPack.optimize.DedupePlugin(),
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
	var webpackConfig = Object.create(require("./webpack.config"));
	webpackConfig.devtool = "sourcemap";
	webpackConfig.debug = true;

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
	"styles",
	"copy",
	"vendor",
	"webpack"
]);

gulp.task("build:dev", [
	"lint",
	"styles:dev",
	"copy",
	"vendor:dev",
	"webpack:dev"
]);

gulp.task("coverage.setup", coverageSetupTask);
gulp.task("coverage.setup.ci", ["eslint"], coverageSetupTask);
function coverageSetupTask() {
	return gulp.src(["**/*.js", "!./node_modules/**/*", "!./test/**/*", "!./bin/**/*", "!./coverage/**/*", "!./migrations/**/*"])
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
}

gulp.task("coverage", ["coverage.setup"], coverageTask);
gulp.task("coverage.ci", ["eslint", "coverage.setup.ci"], coverageTask);
function coverageTask() {
	return gulp.src("test/**/*.js", {read: false})
		.pipe(mocha())
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({thresholds: {global: 80}}));
}

gulp.task("coveralls", ["coverage"], coverallsTask);
gulp.task("coveralls.ci", ["eslint", "coverage.ci"], coverallsTask);
function coverallsTask() {
	return gulp.src("coverage/**/lcov.info")
		.pipe(coveralls());
}

// gulp.task("travis", ["eslint", "coveralls.ci"]);
gulp.task("travis", ["eslint"]);
