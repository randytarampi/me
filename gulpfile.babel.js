import gulp from "gulp";
import concat from "gulp-concat";
import copy from "gulp-copy2";
import eslint from "gulp-eslint";
import minifyCss from "gulp-minify-css";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import uglify from "gulp-uglify";
import gutil from "gulp-util";
import del from "del";
import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import WebpackConfig from "./Webpack.config.babel";
import Config from "./config/config";

gulp.task("copy", function (callback) {
	return copy([
		{
			src: "node_modules/materialize-css/dist/font/**/*",
			dest: "dist/fonts/"
		}
	]);
});

gulp.task("clean", function (callback) {
	del(["dist"], callback);
});

gulp.task("styles", ["styles:dev"], function (callback) {
	return gulp.src("dist/styles.css")
		.pipe(sourcemaps.init())
		.pipe(minifyCss())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
});

gulp.task("styles:dev", function (callback) {
	return gulp.src([
		"node_modules/normalize.css/normalize.css",
		"styles/**/*.scss"
	])
		.pipe(sass().on('error', sass.logError))
		.pipe(concat("styles.css"))
		.pipe(concat("styles.css"))
		.pipe(gulp.dest("dist"));
});

gulp.task("vendor", function (callback) {
	return gulp.src([
		"node_modules/jquery/dist/jquery.min.js",
		"node_modules/materialize-css/bin/materialize.js",
		"node_modules/react/dist/react-with-addons.min.js"
	])
		.pipe(sourcemaps.init())
		.pipe(concat("vendor.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
});

gulp.task("vendor:dev", function (callback) {
	return gulp.src([
		"node_modules/jquery/dist/jquery.js",
		"node_modules/materialize-css/bin/materialize.js",
		"node_modules/react/dist/react-with-addons.js"
	])
		.pipe(sourcemaps.init())
		.pipe(concat("vendor.js"))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
});

gulp.task("webpack", function (callback) {
	var webpackConfig = Object.create(WebpackConfig);
	webpackConfig.plugins.push(
		new Webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new Webpack.optimize.DedupePlugin(),
		new Webpack.optimize.UglifyJsPlugin()
	);

	Webpack(webpackConfig, function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack:prod", err);
		}
		gutil.log("[webpack:prod]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("webpack:dev", function (callback) {
	var webpackConfig = Object.create(WebpackConfig);
	webpackConfig.devtool = "sourcemap";
	webpackConfig.debug = true;

	Webpack(webpackConfig, function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack:dev", err);
		}
		gutil.log("[webpack:dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("eslint", function() {
	return gulp.src('lib/**')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task("lint", ["eslint"]);

gulp.task("build", [
	"lint",
	"clean",
	"styles",
	"copy",
	"vendor",
	"webpack"
]);

gulp.task("build:dev", [
	"lint",
	"copy",
	"styles:dev",
	"vendor:dev",
	"webpack:dev"
]);

gulp.task("serve", function () {
	var webpackConfig = Object.create(WebpackConfig);
	webpackConfig.devtool = "eval";
	webpackConfig.debug = true;

	new WebpackDevServer(Webpack(webpackConfig), {
		publicPath: webpackConfig.output.path,
		stats: {
			colors: true
		}
	}).listen(Config.port, "localhost", function (err) {
		if (err) {
			throw new gutil.PluginError("webpack-dev-server", err);
		}
		gutil.log("[serve]", "Listening on port " + Config.port);
	});
});

gulp.task("dev",
	[
		"build:dev",
		"serve"
	],
	function () {
		gulp.watch([
			"app/**/*",
			"views/**/*"
		], [
			"eslint",
			"webpack:dev"
		]);
		gulp.watch([
			"styles/**/*"
		], [
			"styles:dev"
		]);
	}
);

gulp.task("default", ["dev"]);