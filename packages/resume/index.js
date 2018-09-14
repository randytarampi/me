require("../../babel.register.js");

const render = require("./lib/renderHtml").default;
const Resume = require("./lib/resume").default;

module.exports = {
    render: (resumeJson, pageSize) => render(Resume.fromResume(resumeJson), pageSize),
    pdfRenderOptions: {
        format: process.env.RESUME_PDF_SIZE || "Letter",
        mediaType: "print"
    }
};

