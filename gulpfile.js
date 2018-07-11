require("babel-register");

const gulp = require("gulp");

gulp.task("sassLint", () => {
	const sassLint = require("gulp-sass-lint");

	return gulp.src("sass/**/*.s+(a|c)ss")
		.pipe(sassLint())
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError());
});

gulp.task("lint", gulp.series(["sassLint"]));

gulp.task("clean", (callback) => {
	const del = require("del");

	del(["dist"], callback);
});

gulp.task("copy", () => {
	return gulp
		.src([
			"node_modules/materialize-css/dist/fonts/roboto/**"
		])
		.pipe(gulp.dest("./dist"));
});

gulp.task("styles:dev", () => {
	const autoprefixer = require("gulp-autoprefixer");
	const concat = require("gulp-concat");
	const sass = require("gulp-sass");
	const sassTildeImporter = require("grunt-sass-tilde-importer");

	return gulp.src([
			"styles/style.scss"
		])
		.pipe(sass({
			importer: sassTildeImporter
		}).on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["cover 99.5%"],
			cascade: false
		}))
		.pipe(concat("styles.css"))
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

gulp.task("build", gulp.series([
	"copy",
	"styles"
]));

gulp.task("build:dev", gulp.series([
	"lint",
	"copy",
	"styles:dev"
]));

gulp.task("test", gulp.series(["build"]));

gulp.task("travis", gulp.series(["test"]));
