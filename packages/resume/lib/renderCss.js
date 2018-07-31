import fs from "fs";
import path from "path";

export default () => fs.readFileSync(path.join(__dirname, "../dist/styles.css"), "utf-8");
