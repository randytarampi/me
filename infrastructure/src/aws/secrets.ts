import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import {stage, tags} from "../config";
import {serverlessLicenseKeyParameterName, serviceSecretNames} from "./secretNames";

const config = new pulumi.Config("me");

/** The KMS alias `serverless-secrets` already encrypts this stage's parameters under. */
const kmsKeyAlias = `alias/serverless-${stage}`;

/**
 * Declares one SecureString parameter, but only if its value has been supplied.
 *
 * NOTE-RT: a missing value is skipped rather than defaulted. Creating the parameter with a
 * placeholder would be worse than not creating it: `throwOnMissingSecret` would stop complaining,
 * the deploy would succeed, and the source would fail at runtime against the live API with a
 * credential that looks present. `pulumi preview` warning about the gap is the honest failure mode.
 *
 * Values are supplied out of band and stored encrypted in `Pulumi.<stack>.yaml` by this stack's KMS
 * secrets provider:
 *
 *   pulumi config set --stack prd --secret me:secret.flickr-api-key '…'
 */
const secureParameter = (parameterName: string) => {
    const value = config.getSecret(`secret.${parameterName}`);

    if (!value) {
        pulumi.log.warn(
            `No value configured for SSM parameter '${parameterName}'. It is not being managed by ` +
            `this stack. Set it with \`pulumi config set --stack ${stage} --secret ` +
            `me:secret.${parameterName} '…'\`, or leave it out of \`provider.environmentSecrets\` ` +
            `in service/serverless.yml — with \`throwOnMissingSecret: true\`, naming a parameter ` +
            `that does not exist takes down every function.`
        );

        return undefined;
    }

    return new aws.ssm.Parameter(parameterName, {
        name: parameterName,
        type: aws.ssm.ParameterType.SecureString,
        keyId: kmsKeyAlias,
        value,
        description: `Read by \`service\` @ ${stage} via serverless-secrets`,
        tags
    });
};

export const serviceSecretParameters = Object.fromEntries(
    Object.entries(serviceSecretNames)
        .map(([environmentVariable, parameterName]) => [environmentVariable, secureParameter(parameterName)])
        .filter(([, parameter]) => parameter !== undefined)
);

export const serverlessLicenseKeyParameter = secureParameter(serverlessLicenseKeyParameterName);

/** Which of the 13 this stack is actually managing — the gap is what still needs a value. */
export const managedSecretNames = Object.keys(serviceSecretParameters);
export const unmanagedSecretNames = Object.keys(serviceSecretNames)
    .filter(environmentVariable => !(environmentVariable in serviceSecretParameters));
