import fs from "fs";

export const renderCss = stylesPath => fs.readFileSync(stylesPath, "utf-8");

export default renderCss;
