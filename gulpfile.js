require("babel-register");

const gulp = require("gulp");

gulp.task("clean", () => {
	const vinylPaths = require("vinyl-paths");
	const del = require("del");

	return gulp.src(["dist/", "build/", "coverage/", ".nyc_output/"], {allowEmpty: true})
		.pipe(vinylPaths(del));
});

gulp.task("styles:dev", () => {
	const autoprefixer = require("gulp-autoprefixer");
	const sass = require("gulp-sass");
	const sassTildeImporter = require("grunt-sass-tilde-importer");
	const concat = require("gulp-concat");

	return gulp.src([
			"styles/style.scss"
		])
		.pipe(sass({
			importer: sassTildeImporter
		}).on("error", sass.logError))
		.pipe(concat("styles.css"))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(gulp.dest("dist"));
});

gulp.task("styles", gulp.series(["styles:dev"]), () => {
	const cleanCss = require("gulp-clean-css");
	const sourcemaps = require("gulp-sourcemaps");

	return gulp.src("dist/styles.css")
		.pipe(sourcemaps.init())
		.pipe(cleanCss())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
});

gulp.task("webpack:dev", function (callback) {
	const WebPack = require("webpack");
	const WebPackConfig = require("./webpack.config");
	const webpackConfig = Object.assign({}, WebPackConfig);

	WebPack(webpackConfig, function (err, stats) {
		console.log("[webpack:dev]", stats.toString({colors: true})); // eslint-disable-line no-console
		callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
	});
});

gulp.task("webpack", function (callback) {
	const WebPack = require("webpack");
	const WebPackConfig = require("./webpack.config");
	const webpackConfig = Object.assign({}, WebPackConfig, {
		mode: "production"
	});

	WebPack(webpackConfig, function (err, stats) {
		console.log("[webpack:prod]", stats.toString({colors: true})); // eslint-disable-line no-console
		callback(stats.compilation.errors && stats.compilation.errors[0] && stats.compilation.errors[0]);
	});
});

function isFixed(file) {
	return file.eslint !== null && file.eslint.fixed;
}

gulp.task("eslint", () => {
	const eslint = require("gulp-eslint");
	const gulpIf = require("gulp-if");

	return gulp.src(["**/*.js", "!./node_modules/**/*", "!./dist/**/*"])
		.pipe(eslint({fix: true}))
		.pipe(eslint.format())
		.pipe(gulpIf(isFixed, gulp.dest("./")))
		.pipe(eslint.failOnError());
});

gulp.task("sassLint", () => {
	const sassLint = require("gulp-sass-lint");

	return gulp.src("sass/**/*.s+(a|c)ss")
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError());
});

gulp.task("lint", gulp.parallel([
	"eslint",
	"sassLint"
]));

gulp.task("build", gulp.series([
	"lint",
	"clean",
	"styles",
	"webpack"
]));

gulp.task("build:dev", gulp.series([
	"lint",
	"styles:dev",
	"webpack:dev"
]));

gulp.task("serve", () => {
	const WebpackDevServer = require("webpack-dev-server");
	const Webpack = require("webpack");
	const Config = require("./config/config");
	const WebPackConfig = require("./webpack.config");
	const webpackConfig = Object.assign({}, WebPackConfig);

	new WebpackDevServer(Webpack(webpackConfig), webpackConfig.devServer).listen(Config.port, "localhost", function (err) {
		if (err) {
			throw err;
		}
		console.log("[serve]", "Listening on port " + Config.port); // eslint-disable-line no-console
	});
});

gulp.task("dev",
	gulp.series([
		"build:dev",
		"serve"
	])
);

gulp.task("default", gulp.series(["dev"]));
