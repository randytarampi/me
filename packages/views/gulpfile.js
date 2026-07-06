import {createRequire} from "module";
import path from "path";
import baseGulpfile from "../../gulpfile.base.js";

const require = createRequire(import.meta.url);
require("../../babel.register.cjs");
const __dirname = import.meta.dirname;
// NOTE-RT: unlike every sibling gulpfile.js (job-application, jsonresume-theme, letter, printables,
// resume), this file never set `NODE_CONFIG_DIR`, so `./src/lib`'s `buildPugLocals()` -> `config`
// require below fell back to config's default directory resolution, finding no config sources at
// all and printing a `WARNING: NODE_ENV value of '...' did not match any deployment config file
// names.` for every value of NODE_ENV/NODE_CONFIG_ENV, regardless of what was actually set - this is
// the real root cause behind that warning being reported during `job-applications`/`build`, not a
// gap in NODE_ENV/NODE_CONFIG_ENV decoupling itself.
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const gulp = require("gulp");

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

gulp.task("build:dev", gulp.series(["lint", "clean", "views"]));

gulp.task("dev",
    gulp.series([
        "build:dev"
    ])
);

gulp.task("default", gulp.series(["dev"]));
