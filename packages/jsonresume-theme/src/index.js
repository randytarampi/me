import "@babel/polyfill";

import {renderHtml, Resume} from "@randy.tarampi/resume";
import config from "config";
import path from "path";

export const render = (resumeJson, pageSize) => {
    const resume = Resume.fromResume(resumeJson);
    return renderHtml({
        logger: null,
        printable: resume,
        pageSize,
        assetUrl: config && config.has("resume.assetUrl")
            ? config.get("resume.assetUrl")
            : "",
        printableStylesPath: path.join(__dirname, "../dist/styles.css"),
        printableTemplatePath: path.join(__dirname, "../dist/index.pug"),
        pugTitle: resume.basics.name,
        pugDescription: resume.basics.summary,
        meImageUrl: resume.basics.picture,
        pageUrl: resume.basics.website,
        twitterUsername: config && config.has("me.profiles.Twitter.username")
            ? config.get("me.profiles.Twitter.username")
            : resumeJson.twitter && resumeJson.twitter.user && resumeJson.twitter.user.username,
        facebookUsername: config && config.has("me.profiles.Facebook.username")
            ? config.get("me.profiles.Facebook.username")
            : resumeJson.facebook && resumeJson.facebook.user && resumeJson.facebook.user.username,
        facebookAppId: config && config.has("facebook.app.id")
            ? config.get("facebook.app.id")
            : resumeJson.facebook && resumeJson.facebook.app && resumeJson.facebook.app.id,
        gtmContainerId: config && config.has("gtm.container.id")
            ? config.get("gtm.container.id")
            : resumeJson.gtm && resumeJson.gtm.container && resumeJson.gtm.container.id,
        gaPropertyId: config && config.has("ga.property.id")
            ? config.get("ga.property.id")
            : resumeJson.ga && resumeJson.ga.property && resumeJson.ga.property.id,
        mixpanelAppId: config && config.has("mixpanel.app.id")
            ? config.get("mixpanel.app.id")
            : resumeJson.mixpanel && resumeJson.mixpanel.app && resumeJson.mixpanel.app.id,
    });
};

export const pdfRenderOptions = {
    format: process.env.RESUME_PDF_SIZE || "Letter",
    mediaType: "print"
};

export const pdfRenderExpectations = config && config.has("resume.expectations")
    ? config.get("resume.expectations")
    : {
        pages: 1
    };

// NOTE-RT: These exports are built to conform to the expectations of https://github.com/jsonresume/resume-cli
export default {
    render,
    pdfRenderOptions,
    pdfRenderExpectations
};
