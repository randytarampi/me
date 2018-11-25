import Aws from "aws-sdk";
import http from "http";
import logger from "../logger";

Aws.Config.logger = logger;

export const buildAwsClient = () => {
    let awsClient = Aws;

    if (!process.env.IS_OFFLINE && process.env.NODE_ENV !== "test") {
        const AwsXRay = require("aws-xray-sdk");
        AwsXRay.setLogger(logger);
        AwsXRay.captureHTTPsGlobal(http);
        awsClient = AwsXRay.captureAWS(Aws);
    }

    return awsClient;
};

export const XRayedAwsSdk = buildAwsClient();

export default XRayedAwsSdk;
