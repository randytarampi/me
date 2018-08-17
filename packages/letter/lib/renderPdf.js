import puppeteer from "puppeteer";

export default async (html, letter) => {
    const puppeteerLaunchArgs = [];

    if (process.env.LETTER_PUPPETEER_NO_SANDBOX) {
        puppeteerLaunchArgs.push("--no-sandbox");
    }

    const browser = await puppeteer.launch({
        args: puppeteerLaunchArgs
    });
    const page = await browser.newPage();

    await page.emulateMedia(letter.pdfRenderOptions && letter.pdfRenderOptions.mediaType || "screen");
    await page.goto(`data:text/html,${html}`, {waitUntil: "networkidle2"});
    await page.pdf({
        path: `${__dirname}/../dist/${letter.fileName}.pdf`,
        format: "Letter",
        printBackground: true,
        ...letter.pdfRenderOptions
    });

    await browser.close();
};
