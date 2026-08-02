import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import {
    environmentSubject,
    githubOidcAudience,
    githubOidcIssuer,
    githubRepositoryFullName,
    ownsGlobalResources,
    pulumiStateBucket,
    region,
    stage,
    tags
} from "../config";
import {serverlessLicenseKeyParameterName, serviceSecretNames} from "./secretNames";

const callerIdentity = aws.getCallerIdentityOutput();
const accountId = callerIdentity.accountId;

/**
 * The one OIDC identity provider GitHub Actions authenticates against.
 *
 * NOTE-RT: IAM is account-global, so exactly one stack may own this — hence `ownsGlobalResources`.
 * The `dev` stack looks the same provider up instead of trying to create a second one, which would
 * fail with `EntityAlreadyExists` and leave that stack permanently un-`up`-able.
 *
 * No `thumbprintList`: since 2023 IAM validates `token.actions.githubusercontent.com` against its
 * own library of trusted root CAs, so pinning a leaf thumbprint only creates something that expires.
 *
 * @see https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws
 */
export const githubOidcProvider = ownsGlobalResources
    ? new aws.iam.OpenIdConnectProvider("github-actions", {
        url: `https://${githubOidcIssuer}`,
        clientIdLists: [githubOidcAudience],
        tags
    })
    : undefined;

const githubOidcProviderArn: pulumi.Output<string> = githubOidcProvider
    ? githubOidcProvider.arn
    : pulumi.interpolate`arn:aws:iam::${accountId}:oidc-provider/${githubOidcIssuer}`;

/**
 * Builds a trust policy that only a GitHub Actions job running in this repository, on a job that
 * declares `environment: <environment>`, can satisfy.
 *
 * NOTE-RT: both conditions are load-bearing and neither may be relaxed to a wildcard. GitHub's own
 * guidance is that you "must define at least one condition, so that untrusted repositories can't
 * request access tokens for your cloud resources" — a `sub` of `repo:randytarampi/me:*` would let
 * *any* workflow in this repository, including one added by a pull request, assume the role.
 */
const assumeRolePolicy = (environment: string) => pulumi.all([githubOidcProviderArn]).apply(([arn]) =>
    JSON.stringify({
        Version: "2012-10-17",
        Statement: [
            {
                Effect: "Allow",
                Principal: {Federated: arn},
                Action: "sts:AssumeRoleWithWebIdentity",
                Condition: {
                    StringEquals: {
                        [`${githubOidcIssuer}:aud`]: githubOidcAudience,
                        [`${githubOidcIssuer}:sub`]: environmentSubject(environment)
                    }
                }
            }
        ]
    })
);

/**
 * The role `deploy.service.yml` assumes. Its job already declares
 * `environment: ${{ inputs.deployment_environment }}`, so its `sub` claim is environment-scoped
 * without any further workflow change.
 */
export const serviceDeployRole = new aws.iam.Role(`me-deploy-service-${stage}`, {
    name: `me-deploy-service-${stage}`,
    description: `Deploys \`service\` to ${stage} from ${githubRepositoryFullName}'s deploy.service.yml`,
    assumeRolePolicy: assumeRolePolicy(stage),
    maxSessionDuration: 3600,
    tags
});

/**
 * What a Serverless Framework deploy of `service` actually needs.
 *
 * NOTE-RT: scoped by naming convention rather than by enumerating ARNs one at a time, because a
 * CloudFormation deploy legitimately creates resources that do not exist yet and therefore have no
 * ARN to name in advance. Everything that *can* be pinned to the `service-<stage>` stack, the
 * `service-<stage>-*` function family, or this stage's SSM path, is. The two statements that stay
 * broad are called out below — pretending otherwise would be theatre.
 */
const serviceDeployPolicy = new aws.iam.Policy(`me-deploy-service-${stage}`, {
    name: `me-deploy-service-${stage}`,
    description: `CloudFormation, Lambda and API Gateway rights for \`service\` @ ${stage}`,
    policy: pulumi.all([accountId]).apply(([account]) => JSON.stringify({
        Version: "2012-10-17",
        Statement: [
            {
                Sid: "OwnCloudFormationStackOnly",
                Effect: "Allow",
                Action: "cloudformation:*",
                Resource: [
                    `arn:aws:cloudformation:${region}:${account}:stack/service-${stage}/*`,
                    `arn:aws:cloudformation:${region}:${account}:stack/service-${stage}`
                ]
            },
            {
                Sid: "ValidateTemplatesAndListStacks",
                Effect: "Allow",
                Action: [
                    "cloudformation:ValidateTemplate",
                    "cloudformation:DescribeStacks",
                    "cloudformation:ListStacks"
                ],
                // NOTE-RT: deliberately unscoped. `ValidateTemplate` and `ListStacks` take no
                // resource, so IAM only ever matches them against `*`.
                Resource: "*"
            },
            {
                Sid: "ServerlessDeploymentBuckets",
                Effect: "Allow",
                Action: "s3:*",
                Resource: [
                    "arn:aws:s3:::serverless-framework-deployments-*",
                    "arn:aws:s3:::serverless-framework-deployments-*/*",
                    `arn:aws:s3:::service-${stage}-serverlessdeploymentbucket-*`,
                    `arn:aws:s3:::service-${stage}-serverlessdeploymentbucket-*/*`
                ]
            },
            {
                Sid: "OwnFunctionsAndLayers",
                Effect: "Allow",
                Action: ["lambda:*"],
                Resource: [
                    `arn:aws:lambda:${region}:${account}:function:service-${stage}-*`,
                    `arn:aws:lambda:${region}:${account}:layer:service-${stage}-*`
                ]
            },
            {
                Sid: "OwnExecutionRole",
                Effect: "Allow",
                Action: ["iam:*Role*", "iam:*Policy*", "iam:PassRole", "iam:TagRole"],
                Resource: `arn:aws:iam::${account}:role/service-${stage}-*`
            },
            {
                Sid: "OwnLogGroups",
                Effect: "Allow",
                Action: "logs:*",
                Resource: `arn:aws:logs:${region}:${account}:log-group:/aws/lambda/service-${stage}-*`
            },
            {
                Sid: "OwnTablesBucketAndTopic",
                Effect: "Allow",
                Action: ["dynamodb:*", "sns:*"],
                Resource: [
                    `arn:aws:dynamodb:${region}:${account}:table/${stage}-service-*`,
                    `arn:aws:sns:${region}:${account}:service-${stage}-*`,
                    `arn:aws:sns:${region}:${account}:CloudWatchNotifications`
                ]
            },
            {
                Sid: "OwnPostsBucket",
                Effect: "Allow",
                Action: "s3:*",
                Resource: [
                    `arn:aws:s3:::randytarampi-service-${stage}-posts`,
                    `arn:aws:s3:::randytarampi-service-${stage}-posts/*`
                ]
            },
            {
                Sid: "ReadThisStagesSecrets",
                Effect: "Allow",
                Action: ["ssm:GetParameter", "ssm:GetParameters", "ssm:DescribeParameters"],
                // NOTE-RT: this role is now the *only* principal that reads these. `env.yml`'s
                // `${ssm:…}` references are resolved at deploy time, so the functions no longer
                // hold any SSM permission at all — the wildcard `ssm:GetParameters` that
                // `serverless-secrets` injected into the execution role went with the plugin.
                //
                // Enumerated, not a path prefix: the parameters are flat (`flickr-api-key`) with
                // no `/<stage>/` namespace to scope against — the stages are separated by region.
                // A `parameter/*` grant would hand the deploy role every secret in the account.
                Resource: [
                    ...Object.values(serviceSecretNames)
                        .map(name => `arn:aws:ssm:${region}:${account}:parameter/${name}`),
                    `arn:aws:ssm:${region}:${account}:parameter${serverlessLicenseKeyParameterName}`
                ]
            },
            {
                Sid: "DecryptThisStagesSecrets",
                Effect: "Allow",
                Action: ["kms:Decrypt", "kms:DescribeKey"],
                Resource: "*",
                Condition: {
                    // NOTE-RT: `kms:*` cannot be pinned to an alias — aliases are not valid policy
                    // resources — so the key is constrained by *who may use it for what* instead.
                    StringEquals: {"kms:ViaService": `ssm.${region}.amazonaws.com`}
                }
            },
            {
                Sid: "ApiGatewayAlarmsAndDns",
                Effect: "Allow",
                // NOTE-RT: deliberately unscoped, and the honest reason is that these three
                // services name resources with generated ids the deploy cannot know in advance:
                // API Gateway rest-api ids, CloudWatch alarm creation, and Route53 change-batches
                // against a zone whose record set does not exist until the deploy makes it.
                // `serverless-domain-manager` also has to *list* certificates to find one by name.
                Action: [
                    "apigateway:*",
                    "cloudwatch:PutMetricAlarm",
                    "cloudwatch:DeleteAlarms",
                    "cloudwatch:DescribeAlarms",
                    "route53:*",
                    "acm:ListCertificates",
                    "acm:DescribeCertificate",
                    "xray:PutTraceSegments",
                    "xray:PutTelemetryRecords"
                ],
                Resource: "*"
            }
        ]
    })),
    tags
});

new aws.iam.RolePolicyAttachment(`me-deploy-service-${stage}`, {
    role: serviceDeployRole.name,
    policyArn: serviceDeployPolicy.arn
});

/**
 * A read-only role for `pulumi preview` on pull requests, so drift shows up in review rather than
 * during a deploy.
 *
 * NOTE-RT: its `sub` is `repo:<owner>/<repo>:pull_request`, not an environment — a pull-request job
 * cannot use a protected environment without a human approving every PR. That is exactly why this
 * role gets `ReadOnlyAccess` plus the two narrow grants below and nothing else: the trust condition
 * is the weakest one in this file, so the permission set has to be the narrowest. Anything added
 * here is reachable from a pull request opened by anyone.
 */
export const infrastructurePreviewRole = ownsGlobalResources
    ? new aws.iam.Role("me-infrastructure-preview", {
        name: "me-infrastructure-preview",
        description: `Read-only \`pulumi preview\` for ${githubRepositoryFullName} pull requests`,
        assumeRolePolicy: pulumi.all([githubOidcProviderArn]).apply(([arn]) => JSON.stringify({
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: "Allow",
                    Principal: {Federated: arn},
                    Action: "sts:AssumeRoleWithWebIdentity",
                    Condition: {
                        StringEquals: {
                            [`${githubOidcIssuer}:aud`]: githubOidcAudience,
                            [`${githubOidcIssuer}:sub`]: `repo:${githubRepositoryFullName}:pull_request`
                        }
                    }
                }
            ]
        })),
        maxSessionDuration: 3600,
        tags
    })
    : undefined;

if (infrastructurePreviewRole) {
    new aws.iam.RolePolicyAttachment("me-infrastructure-preview-readonly", {
        role: infrastructurePreviewRole.name,
        policyArn: "arn:aws:iam::aws:policy/ReadOnlyAccess"
    });

    // NOTE-RT: `ReadOnlyAccess` is not enough to run a `preview`, and the two things it lacks are
    // both consequences of the DIY S3 backend rather than of anything the program does:
    //
    // - `kms:Decrypt` on this stack's secrets provider. Every `me:secret.*` config value is
    //   KMS-encrypted, and `pulumi preview` reads them to compute the diff. `ReadOnlyAccess`
    //   deliberately excludes decryption of anything.
    // - `s3:PutObject`/`s3:DeleteObject` on the state bucket. The self-managed backend takes an
    //   advisory lock by *writing* a `.pulumi/locks/**` object and deleting it afterwards, even for
    //   a read-only preview. Without it the preview fails before it reads a single resource.
    //
    // The grants are as narrow as each API permits. Deliberately *not* `s3:GetObject` — that comes
    // from `ReadOnlyAccess` — and deliberately not `s3:*`: this role must never be able to rewrite
    // the state it is previewing against.
    const previewKmsKeyArns = [
        aws.kms.getAliasOutput(
            {name: "alias/serverless-dev"},
            {provider: new aws.Provider("preview-us-east-1", {region: "us-east-1"})}
        ).targetKeyArn,
        aws.kms.getAliasOutput(
            {name: "alias/serverless-prd"},
            {provider: new aws.Provider("preview-ca-central-1", {region: "ca-central-1"})}
        ).targetKeyArn
    ];

    new aws.iam.RolePolicy("me-infrastructure-preview-backend", {
        name: "me-infrastructure-preview-backend",
        role: infrastructurePreviewRole.name,
        // NOTE-RT: both stages' keys, because `infrastructure.yml` previews `dev` and `prd` as a
        // matrix from one role. Looked up by alias rather than hardcoded, so a key rotation that
        // repoints the alias does not silently strip the preview of its permissions.
        policy: pulumi.all(previewKmsKeyArns).apply(([devKeyArn, prdKeyArn]) => JSON.stringify({
            Version: "2012-10-17",
            Statement: [
                {
                    Sid: "DecryptStackConfigSecrets",
                    Effect: "Allow",
                    Action: ["kms:Decrypt", "kms:DescribeKey"],
                    Resource: [devKeyArn, prdKeyArn]
                },
                {
                    Sid: "TakeAndReleaseTheBackendLock",
                    Effect: "Allow",
                    Action: ["s3:PutObject", "s3:DeleteObject"],
                    Resource: `arn:aws:s3:::${pulumiStateBucket}/*`
                }
            ]
        }))
    });
}
