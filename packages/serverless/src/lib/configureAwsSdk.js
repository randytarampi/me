import Aws from "aws-sdk";
import AwsXRay from "aws-xray-sdk";
import http from "http";

export const configureAwsSdk = logger => {
    Aws.Config.logger = logger;

    let awsClient = Aws;

    if (!process.env.IS_OFFLINE && process.env.NODE_ENV !== "test") {
        AwsXRay.setLogger(logger);
        AwsXRay.captureHTTPsGlobal(http);
        awsClient = AwsXRay.captureAWS(Aws);
    }

    return awsClient;
};

export default configureAwsSdk;
