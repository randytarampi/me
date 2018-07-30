var fs = require("fs");
var Handlebars = require("handlebars");

function render(resume) {
    var css = fs.readFileSync(__dirname + "/dist/styles.css", "utf-8");
    var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    Handlebars.registerHelper("date", function (date) {
        var theDate = new Date(date);

        return months[theDate.getMonth()] + " " + theDate.getFullYear();
    });

    Handlebars.registerHelper("ifGt", function (v1, v2, options) {
        if (v1 > v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    return Handlebars.compile(tpl, {noEscape: true})({
        css: css,
        resume: resume
    });
}

Handlebars.registerHelper("paragraphSplit", function (plaintext) {
    var i, output = "",
        lines = plaintext.split(/\r\n|\r|\n/g);
    for (i = 0; i < lines.length; i++) {
        if (lines[i]) {
            output += "<p>" + lines[i] + "</p>";
        }
    }
    return new Handlebars.SafeString(output);
});

module.exports = {
    render: render
};
