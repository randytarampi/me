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
                // NOTE-RT: found the hard way, `AccessDenied` on `events:DescribeRule` while
                // creating `WarmUpPluginDefaultEventsRuleSchedule1` — the CloudFormation stack
                // manages an `AWS::Events::Rule` per scheduled function (`cachePosts`'s seven
                // crons, plus the warmup plugin's own warmer schedule since it moved to the
                // multi-warmer config), and nothing in this policy granted `events:*` at all.
                Sid: "OwnEventRules",
                Effect: "Allow",
                Action: "events:*",
                Resource: `arn:aws:events:${region}:${account}:rule/service-${stage}-*`
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
 * Infrastructure deploy roles for `pulumi preview` and `pulumi up`.
 *
 * NOTE-RT: replaces the old `me-infrastructure-preview` role. The new design runs preview and
 * deploy in the same workflow, with the `prd` environment gate controlling whether `pulumi up`
 * proceeds. Each role is scoped to its environment via the OIDC `sub` condition.
 *
 * The policy grants everything the DIY S3 backend needs (KMS decrypt for stack secrets, S3 lock
 * operations) plus the full set of AWS actions Pulumi needs to manage resources. This is broader
 * than the old read-only preview role, but the `prd` role sits behind a required human approval
 * gate, and the `dev` role is scoped to `dev-*` resources.
 */
const infrastructureDeployRole = (stack: string) => {
    const region = stack === "prd" ? "ca-central-1" : "us-east-1";
    const provider = new aws.Provider(`infra-${stack}`, {region});

    const role = new aws.iam.Role(`me-deploy-infrastructure-${stack}`, {
        name: `me-deploy-infrastructure-${stack}`,
        description: `pulumi preview/up for ${githubRepositoryFullName} ${stack} infrastructure`,
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
                            [`${githubOidcIssuer}:sub`]: `repo:${githubRepositoryFullName}:environment:${stack}`
                        }
                    }
                }
            ]
        })),
        maxSessionDuration: 3600,
        tags
    }, {provider});

    // NOTE-RT: the policy needs to be in the same region as the role for the attachment to work,
    // but the policy document itself references resources across regions.
    const kmsKeyArn = aws.kms.getAliasOutput(
        {name: `alias/serverless-${stack}`},
        {provider}
    ).targetKeyArn;

    const policy = new aws.iam.RolePolicy(`me-deploy-infrastructure-${stack}-policy`, {
        name: `me-deploy-infrastructure-${stack}-policy`,
        role: role.name,
        policy: pulumi.all([kmsKeyArn]).apply(([keyArn]) => JSON.stringify({
            Version: "2012-10-17",
            Statement: [
                {
                    Sid: "DecryptStackConfigSecrets",
                    Effect: "Allow",
                    Action: ["kms:Decrypt", "kms:DescribeKey"],
                    Resource: keyArn
                },
                {
                    Sid: "TakeAndReleaseTheBackendLock",
                    Effect: "Allow",
                    Action: ["s3:PutObject", "s3:DeleteObject"],
                    Resource: `arn:aws:s3:::${pulumiStateBucket}/*`
                },
                {
                    Sid: "ReadState",
                    Effect: "Allow",
                    Action: ["s3:GetObject", "s3:ListBucket"],
                    Resource: [
                        `arn:aws:s3:::${pulumiStateBucket}`,
                        `arn:aws:s3:::${pulumiStateBucket}/*`
                    ]
                },
                {
                    Sid: "ManageInfrastructure",
                    Effect: "Allow",
                    Action: [
                        "iam:*",
                        "s3:*",
                        "sqs:*",
                        "sns:*",
                        "logs:*",
                        "cloudwatch:*",
                        "route53:*",
                        "acm:*",
                        "kms:*",
                        "ssm:*",
                        "ec2:*",
                        "lambda:*",
                        "dynamodb:*",
                        "apigateway:*",
                        "events:*",
                        "xray:*"
                    ],
                    Resource: "*"
                }
            ]
        }))
    }, {provider});

    return {role, policy};
};

export const infrastructureDevRole = ownsGlobalResources ? infrastructureDeployRole("dev") : undefined;
export const infrastructurePrdRole = ownsGlobalResources ? infrastructureDeployRole("prd") : undefined;
