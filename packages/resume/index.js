require("../../babel.register.js");

const render = require("./lib/renderHtml").default;

module.exports = {
    render,
    pdfRenderOptions: {
        format: process.env.RESUME_PDF_SIZE || "Letter",
        mediaType: "print"
    }
};

