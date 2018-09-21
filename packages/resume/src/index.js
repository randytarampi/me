const config = require("config");

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
    pdfRenderExpectations: config.get("resume.expectations")
};

