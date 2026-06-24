import AwsXRay from "aws-xray-sdk";
import http from "http";

export const configureAwsSdk = logger => {
    if (!process.env.IS_OFFLINE && process.env.NODE_ENV !== "test") {
        AwsXRay.setLogger(logger);
        AwsXRay.captureHTTPsGlobal(http);
    }

    return AwsXRay;
};

export default configureAwsSdk;
