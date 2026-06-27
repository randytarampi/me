// @ts-check
import AwsXRay from "aws-xray-sdk";
import http from "http";

/** @param {*} logger - The logger to hand to X-Ray. @returns {*} The configured SDK. */
export const configureAwsSdk = logger => {
    if (!process.env.IS_OFFLINE && process.env.NODE_ENV !== "test") {
        AwsXRay.setLogger(logger);
        AwsXRay.captureHTTPsGlobal(http);
    }

    return AwsXRay;
};

/** @type {typeof configureAwsSdk} */
export default configureAwsSdk;
