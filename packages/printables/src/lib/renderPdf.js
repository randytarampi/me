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
    const pdfPath = path.join(printableDestinationDirectory, `${printable.filename}.pdf`);

    await page.emulateMediaType(printable.pdfRenderOptions && printable.pdfRenderOptions.mediaType || "print"); // NOTE-RT: Different from `resume-cli` default
    await page.setContent(printableHtml, {waitUntil: "load"});
    await page.pdf({
        path: pdfPath,
        format: "Letter",
        printBackground: true,
        ...printable.pdfRenderOptions
    });

    await browser.close();

    const pdfExpectations = printable.pdfRenderExpectations || {};
    const pdfMetadata = await exifTool.read(pdfPath);

    // NOTE-RT: Throw explicit `Error`s (rather than `assert.strictEqual`) so the messages stay exact — Node's
    // NOTE-RT: `AssertionError` now appends a generated diff (e.g. `\n\n1 !== 2`) to the message.
    if (pdfExpectations.pages && pdfMetadata.PageCount !== pdfExpectations.pages) {
        throw new Error(`Expected PDF to have ${pdfExpectations.pages} pages, but it has ${pdfMetadata.PageCount} instead`);
    }

    // NOTE-RT: exiftool-vendored may report file size in "KiB" (binary) or "kB" (SI) depending on version/platform.
    // NOTE-RT: Both are kilobyte-scale — accept either. Reject MiB/MB (too large) or bytes (too small).
    const fileSizeUnit = pdfMetadata.FileSize.split(" ")[1];
    if (fileSizeUnit !== "KiB" && fileSizeUnit !== "kB") {
        throw new Error(`Expected PDF to have file size on order of kB, but it is ${pdfMetadata.FileSize} instead`);
    }

    await exifTool
        .write(pdfPath, printable.pdfMetadata);

    await exifTool.end();
};

export default renderPdf;
