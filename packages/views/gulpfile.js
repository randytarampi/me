require("../../babel.register.js");

const gulp = require("gulp");
const baseGulpfile = require("../../gulpfile.base");

const taskParameters = {
    relativePath: __dirname,
    gulp
};

baseGulpfile.clean(taskParameters);

baseGulpfile.eslint(taskParameters);
baseGulpfile.pugLint(taskParameters);
gulp.task("lint", gulp.parallel(["eslint", "pugLint"]));

gulp.task("views:index", () => {
    const pug = require("gulp-pug");
    const packageJson = require("./package.json");
    const {buildPugLocals} = require("./src/lib");

    return gulp.src(["templates/index.pug"])
        .pipe(pug({
            locals: buildPugLocals({
                bundleName: "views",
                packageJson
            })
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("views", gulp.parallel([
    "views:index"
]));

gulp.task("build", gulp.series([
    "clean",
    "views"
]));

gulp.task("default", gulp.series(["build"]));
