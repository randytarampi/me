import {createRequire} from "module";
import path from "path";
import baseGulpfile from "../../gulpfile.base.js";

const require = createRequire(import.meta.url);
require("../../babel.register.cjs");
const __dirname = import.meta.dirname;
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const gulp = require("gulp");

const taskParameters = {
    relativePath: __dirname,
    gulp
};

baseGulpfile.clean(taskParameters);

baseGulpfile.eslint(taskParameters);
gulp.task("lint", gulp.parallel(["eslint"]));
