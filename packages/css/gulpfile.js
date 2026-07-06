import {createRequire} from "module";
import baseGulpfile from "../../gulpfile.base.js";

const require = createRequire(import.meta.url);
require("../../babel.register.cjs");
const __dirname = import.meta.dirname;

const gulp = require("gulp");

const taskParameters = {
    relativePath: __dirname,
    gulp
};

baseGulpfile.clean(taskParameters);

gulp.task("lint", done => done());

gulp.task("copy", () => {
    const path = require("path");
    return gulp
        .src([
            path.resolve(require.resolve("@fortawesome/fontawesome-free"), "../../webfonts/*")
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
