import {createRequire} from "module";
import baseGulpfile from "../gulpfile.base.js";

const require = createRequire(import.meta.url);
require("../babel.register.cjs");
const __dirname = import.meta.dirname;

const gulp = require("gulp");

const taskParameters = {
    relativePath: __dirname,
    gulp
};

baseGulpfile.clean(taskParameters);

baseGulpfile.eslint(taskParameters);
gulp.task("lint", gulp.parallel(["eslint"]));

baseGulpfile.testUnit(taskParameters);
baseGulpfile.testIntegration(taskParameters);
baseGulpfile.test(taskParameters);
