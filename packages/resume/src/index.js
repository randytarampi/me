const config = require("config");

// NOTE-RT: This default module export is built to conform to the expectations of https://github.com/jsonresume/resume-cli
module.exports = {
    render: (resumeJson, pageSize) => {
        const {renderHtml} = require("./lib/renderHtml");
        const Resume = require("./lib/resume").default;

        return renderHtml({
            printable: Resume.fromResume(resumeJson),
            pageSize
        });
    },
    pdfRenderOptions: {
        format: process.env.RESUME_PDF_SIZE || "Letter",
        mediaType: "print"
    },
    pdfRenderExpectations: config.has("resume.expectations")
        ? config.get("resume.expectations")
        : {
            pages: 1
        }
};

