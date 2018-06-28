import serverlessSecretsClient from "serverless-secrets/client";

export default () => {
    return serverlessSecretsClient.load();
};
