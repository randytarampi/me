import assert from "assert";
import config from "config";
import {ExifTool} from "exiftool-vendored";
import path from "path";
import puppeteer from "puppeteer";

export default async (html, letter) => {
    const exifTool = new ExifTool();
    const puppeteerLaunchArgs = [];

    if (process.env.LETTER_PUPPETEER_NO_SANDBOX) {
        puppeteerLaunchArgs.push("--no-sandbox");
    }

    const browser = await puppeteer.launch({
        args: puppeteerLaunchArgs
    });
    const page = await browser.newPage();
    const pdfPath = path.join(__dirname, `../dist/${letter.fileName}.pdf`);

    await page.emulateMedia(letter.pdfRenderOptions && letter.pdfRenderOptions.mediaType || "print");
    await page.goto(`data:text/html,${html}`, {waitUntil: "networkidle0"});
    await page.pdf({
        path: pdfPath,
        format: "Letter",
        printBackground: true,
        ...letter.pdfRenderOptions
    });

    await browser.close();

    const pdfExpectations = letter.pdfRenderExpectations || config.get("letter.expectations") || {};
    const pdfMetadata = await exifTool.read(pdfPath);

    if (pdfExpectations.pages) {
        assert.strictEqual(pdfMetadata.PageCount, pdfExpectations.pages, `Expected PDF to have ${pdfExpectations.pages} pages, but it has ${pdfMetadata.PageCount} instead`);
    }

    await exifTool
        .write(pdfPath, {
            Author: letter.basics.name,
            Creator: letter.basics.name,
            Producer: letter.basics.name,
            Subject: letter.basics.name,
            Title: letter.basics.name,
            Keywords: [
                "cover letter",
                "@randy.tarampi/letter",
                letter.basics.name,
                letter.basics.label,
                letter.basics.website,
                letter.basics.phone,
                letter.basics.email,
                letter.fileName
            ]
        });

    await exifTool.end();
};
