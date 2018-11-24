import Aws from "aws-sdk";
import http from "http";
import logger from "../logger";

Aws.Config.logger = logger;

let AwsClient = Aws;

if (!process.env.IS_OFFLINE && process.env.NODE_ENV !== "test") {
    const AwsXRay = require("aws-xray-sdk");
    AwsXRay.setLogger(logger);
    AwsXRay.captureHTTPsGlobal(http);
    AwsClient = AwsXRay.captureAWS(Aws);
}

export const XRayedAwsSdk = AwsClient;

export default XRayedAwsSdk;
