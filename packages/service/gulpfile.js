require("../../babel.register.cjs");
const baseGulpfile = require("../../gulpfile.base.js");

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
module.exports.default = module.exports;
