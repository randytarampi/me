import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import {stage, tags} from "../config";
import {serverlessLicenseKeyParameterName, serviceSecretNames} from "./secretNames";

const config = new pulumi.Config("me");

/** The KMS alias this stage's parameters have been encrypted under since 2022. */
const kmsKeyAlias = `alias/serverless-${stage}`;

/**
 * Declares one SecureString parameter, but only if its value has been supplied.
 *
 * NOTE-RT: a missing value is skipped rather than defaulted. Creating the parameter with a
 * placeholder would be worse than not creating it: the `${ssm:…}` reference in `env.yml` would
 * resolve, the deploy would succeed, and the source would fail at run time against the live API
 * with a credential that looks present. `pulumi preview` warning about the gap is the honest
 * failure mode, and an unresolvable reference failing the deploy is the second line of defence.
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
            `me:secret.${parameterName} '…'\`, or drop its \`\${ssm:${parameterName}}\` reference ` +
            `from \`provider.environment\` in service/env.yml — an unresolvable reference fails ` +
            `the whole deploy, not just the one source that needed it.`
        );

        return undefined;
    }

    return new aws.ssm.Parameter(parameterName, {
        name: parameterName,
        type: aws.ssm.ParameterType.SecureString,
        keyId: kmsKeyAlias,
        value,
        description: `Resolved into \`service\` @ ${stage} at deploy time by \${ssm:${parameterName}}`,
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
