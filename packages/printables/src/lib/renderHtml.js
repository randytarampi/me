import path from "path";
import pug from "pug";
import {buildPugLocalsBuilder} from "./buildPugLocals.js";

/**
 * NOTE-RT: two-stage factory — the first call captures configuration, the second renders.
 * Mirror this call shape (see `packages/job-application/gulpfile.js` `renderPrintable`):
 *
 *   const htmlRenderer = renderHtml({printableComponent, printableStylesPath});
 *   const printableRenderer = renderPrintableHtml(htmlRenderer, printableRenderOptions);
 *   const html = await printableRenderer(printable);
 *
 * Calling the returned factory with the full options object (or treating `renderHtml` itself
 * as the renderer) silently resolves the pug template from the wrong path — the fallback is
 * cwd-relative. Precedence for the template path: `PRINTABLE_TEMPLATE_PATH` env →
 * `__PRINTABLE_TEMPLATE_PATH__` build global → `printableTemplatePath` arg →
 * `../views/templates/index.pug` (cwd-relative fallback).
 */
export const renderHtml = ({printableComponent, printableStylesPath, printableTemplatePath, printable}) => {
    const printablePugLocalsBuilder = buildPugLocalsBuilder({printableComponent, printableStylesPath, printable});

    return renderLocals => {
        const pugLocals = printablePugLocalsBuilder(renderLocals);
        return pug.renderFile(process.env.PRINTABLE_TEMPLATE_PATH || (typeof __PRINTABLE_TEMPLATE_PATH__ !== "undefined" && __PRINTABLE_TEMPLATE_PATH__ ? path.resolve(__PRINTABLE_TEMPLATE_PATH__) : null) || printableTemplatePath || path.resolve("../views/templates/index.pug"), pugLocals);
    };
};

export default renderHtml;