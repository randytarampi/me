import {createRequire} from "module";
import path from "path";
import {fileURLToPath} from "url";
import baseGulpfile from "../../gulpfile.base.js";

const require = createRequire(import.meta.url);
require("../../babel.register.cjs");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

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

baseGulpfile.webpack(taskParameters);
