require("babel-register");

const gulp = require("gulp");

gulp.task("clean", () => {
    const vinylPaths = require("vinyl-paths");
    const del = require("del");

    return gulp.src(["dist/", "build/", "coverage/", ".nyc_output/"], {allowEmpty: true})
        .pipe(vinylPaths(del));
});

gulp.task("copy", () => {
    return gulp
        .src([
            "node_modules/@randy.tarampi/css/node_modules/materialize-css/dist/fonts/roboto/**",
            "node_modules/@randy.tarampi/css/node_modules/@fortawesome/fontawesome-free/sprites/**",
            "node_modules/@randy.tarampi/css/node_modules/@fortawesome/fontawesome-free/svgs/**",
            "node_modules/@randy.tarampi/css/node_modules/@fortawesome/fontawesome-free/webfonts/**"
        ])
        .pipe(gulp.dest("./dist"));
});

gulp.task("docs", () => {
    return gulp
        .src([
            "dist/**"
        ])
        .pipe(gulp.dest("./docs"));
});

gulp.task("styles:dev", () => {
    const autoprefixer = require("gulp-autoprefixer");
    const sass = require("gulp-sass");
    const concat = require("gulp-concat");

    return gulp.src([
            "styles/style.scss"
        ])
        .pipe(sass({
            includePaths: ["node_modules", "../../node_modules"]
        }).on("error", sass.logError))
        .pipe(concat("styles.css"))
        .pipe(autoprefixer({
            browsers: ["cover 99.5%"],
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

function isFixed(file) {
    return file.eslint !== null && file.eslint.fixed;
}

gulp.task("eslint", () => {
    const eslint = require("gulp-eslint");
    const gulpIf = require("gulp-if");

    return gulp.src(["**/*.js", "!./node_modules/**/*", "!./dist/**/*", "!./docs/**/*", "!./coverage/**/*", "!./.nyc_output/**/*"])
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
    "clean",
    gulp.parallel(["copy", "styles"])
]));

gulp.task("build:dev", gulp.series([
    gulp.parallel(["lint", "copy", "styles:dev"]),
]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));

