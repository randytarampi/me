const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const gulpIf = require("gulp-if");
const minifyCss = require("gulp-minify-css");
const sass = require("gulp-sass");
const sassTildeImporter = require("grunt-sass-tilde-importer");
const sourcemaps = require("gulp-sourcemaps");

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

gulp.task("clean", (callback) => {
	del(["dist"], callback);
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

gulp.task("build", [
	"lint",
	"styles"
]);

gulp.task("build:dev", [
	"lint",
	"styles:dev"
]);

gulp.task("travis", ["styles"]);
