import serverlessSecretsClient from "serverless-secrets/client";

export default () => {
    if (process.env.NODE_ENV === "test") {
        return Promise.resolve();
    }
    return serverlessSecretsClient.load();
};
