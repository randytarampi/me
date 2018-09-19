import assert from "assert";
import config from "config";
import {ExifTool} from "exiftool-vendored";
import path from "path";
import puppeteer from "puppeteer";

export default async (html, resume) => {
    const exifTool = new ExifTool();
    const puppeteerLaunchArgs = [];

    if (process.env.RESUME_PUPPETEER_NO_SANDBOX) {
        puppeteerLaunchArgs.push("--no-sandbox");
    }

    const browser = await puppeteer.launch({
        args: puppeteerLaunchArgs
    });
    const page = await browser.newPage();
    const pdfPath = path.join(__dirname, `../dist/${resume.fileName}.pdf`);

    await page.emulateMedia(resume.pdfRenderOptions && resume.pdfRenderOptions.mediaType || "print"); // NOTE-RT: Different from `resume-cli` default
    await page.goto(`data:text/html,${html}`, {waitUntil: "networkidle0"});
    await page.pdf({
        path: pdfPath,
        format: "Letter",
        printBackground: true,
        ...resume.pdfRenderOptions
    });

    await browser.close();

    const pdfExpectations = resume.pdfRenderExpectations || config.get("resume.expectations") || {};
    const pdfMetadata = await exifTool.read(pdfPath);

    if (pdfExpectations.pages) {
        assert.strictEqual(pdfMetadata.PageCount, pdfExpectations.pages, `Expected PDF to have ${pdfExpectations.pages} pages, but it has ${pdfMetadata.PageCount} instead`);
    }

    await exifTool
        .write(pdfPath, {
            Author: resume.basics.name,
            Creator: resume.basics.name,
            Producer: resume.basics.name,
            Subject: resume.basics.name,
            Title: resume.basics.name,
            Keywords: [
                "resume",
                "cv",
                "resume.json",
                "JSON resume",
                "resume-cli",
                "@randy.tarampi/resume",
                resume.basics.name,
                resume.basics.label,
                resume.basics.website,
                resume.basics.phone,
                resume.basics.email,
                resume.fileName
            ]
        });

    await exifTool.end();
};
