import {createRequire} from "module";
import path from "path";
import {fileURLToPath} from "url";
import baseGulpfile from "../../gulpfile.base.js";

const require = createRequire(import.meta.url);
require("../../babel.register.cjs");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
