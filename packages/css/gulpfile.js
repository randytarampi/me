require("../../babel.register.js");

const gulp = require("gulp");
const baseGulpfile = require("../../gulpfile.base");

const taskParameters = {
    relativePath: __dirname,
    gulp
};

baseGulpfile.clean(taskParameters);

baseGulpfile.sassLint(taskParameters);
gulp.task("lint", gulp.series(["sassLint"]));

gulp.task("copy", () => {
    return gulp
        .src([
            "node_modules/materialize-css/dist/fonts/roboto/**",
            "node_modules/@fortawesome/fontawesome-free/webfonts/**"
        ])
        .pipe(gulp.dest("./dist"));
});

baseGulpfile.stylesDev(taskParameters);
baseGulpfile.styles(taskParameters);

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
