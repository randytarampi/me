import config from "config";
import path from "path";
import pug from "pug";
import packageJson from "../package.json";
import renderCss from "./renderCss";
import renderJsx from "./renderJsx";

export default resume => {
    return pug.renderFile(path.join(__dirname, "../views/index.pug"), {
        css: renderCss(),
        content: renderJsx(resume),
        assetUrl: config.get("assetUrl"),
        sentryDsn: config.get("sentryDsn"),
        gtm: config.get("gtm"),
        environment: process.env.NODE_ENV || "local",
        version: packageJson.version
    });
};

