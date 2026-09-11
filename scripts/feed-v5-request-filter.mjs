const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

// Google Maps is the only external browser dependency exercised by the local map route.
export const ALLOWED_EXTERNAL_HOSTS = new Set(["maps.googleapis.com"]);

export const isAllowedRequestDestination = requestUrl => {
    let url;
    try {
        url = new URL(requestUrl);
    } catch {
        return false;
    }

    return LOOPBACK_HOSTS.has(url.hostname) || ALLOWED_EXTERNAL_HOSTS.has(url.hostname);
};

const isAppApiAwsDestination = request => {
    let url;
    try {
        url = new URL(request.url);
    } catch {
        return false;
    }

    return url.pathname.split("/").includes("api")
        || /^api(?:\.|$)/i.test(url.hostname)
        || /aws|amazonaws/i.test(url.hostname)
        || Object.keys(request.headers || {}).some(header => /^x-amz-|authorization$/i.test(header));
};

export const assertLoopbackRequests = requests => {
    const externalRequests = requests.filter(request => isAppApiAwsDestination(request) && !isAllowedRequestDestination(request.url));
    if (externalRequests.length > 0) {
        throw new Error(`Local browser made non-loopback request(s): ${externalRequests.map(request => request.url).join(", ")}`);
    }
};
