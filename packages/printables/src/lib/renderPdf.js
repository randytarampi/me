import assert from "assert";
import {ExifTool} from "exiftool-vendored";
import path from "path";
import puppeteer from "puppeteer";

export const renderPdf = async ({printableHtml, printable, printableDestinationDirectory}) => {
    const exifTool = new ExifTool();
    const puppeteerLaunchArgs = [];

    if (process.env.PRINTABLE_PUPPETEER_NO_SANDBOX) {
        puppeteerLaunchArgs.push("--no-sandbox");
    }

    const browser = await puppeteer.launch({
        args: puppeteerLaunchArgs
    });
    const page = await browser.newPage();
    const pdfPath = path.join(printableDestinationDirectory, `${printable.fileName}.pdf`);

    await page.emulateMedia(printable.pdfRenderOptions && printable.pdfRenderOptions.mediaType || "print"); // NOTE-RT: Different from `printable-cli` default
    await page.goto(`data:text/html,${printableHtml}`, {waitUntil: "networkidle0"});
    await page.pdf({
        path: pdfPath,
        format: "Letter",
        printBackground: true,
        ...printable.pdfRenderOptions
    });

    await browser.close();

    const pdfExpectations = printable.pdfRenderExpectations || {};
    const pdfMetadata = await exifTool.read(pdfPath);

    if (pdfExpectations.pages) {
        assert.strictEqual(pdfMetadata.PageCount, pdfExpectations.pages, `Expected PDF to have ${pdfExpectations.pages} pages, but it has ${pdfMetadata.PageCount} instead`);
    }

    await exifTool
        .write(pdfPath, printable.pdfMetadata);

    await exifTool.end();
};

export default renderPdf;
