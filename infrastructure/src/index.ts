import * as pulumi from "@pulumi/pulumi";

import {apiCertificateArn, hostedZoneId, secretsKmsKeyArn} from "./aws/adopted";
import {infrastructurePreviewRole, serviceDeployRole} from "./aws/oidc";
import {managedSecretNames, unmanagedSecretNames} from "./aws/secrets";
import {githubRepositoryFullName, stage} from "./config";
import {environments} from "./github/environments";
import "./github/repository";
import {masterRuleset} from "./github/rulesets";
import {retiredSecretsList} from "./github/secrets";

/**
 * The entry point Pulumi loads. Every resource module is imported for its side effects and
 * re-exports whatever is worth reading back out of `pulumi stack output`.
 *
 * The boundary this program holds to: Pulumi owns *identity, access and repository configuration*.
 * `service/serverless.yml` owns *the application* — the posts S3 bucket, both DynamoDB tables, the
 * SNS dead-letter topic, the six CloudWatch alarms and the API Gateway custom domain all stay
 * there. Splitting them would put two tools in a fight over one CloudFormation stack.
 */
export const repository = githubRepositoryFullName;
export const deploymentStage = stage;

/**
 * The ARN `deploy.service.yml` passes to `configure-aws-credentials`' `role-to-assume`.
 *
 * NOTE-RT: there is deliberately no equivalent for the Pages deploy. `deploy.pages.reusable.yml`
 * injected `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` as job-level `env` for years, but nothing in
 * that job ever read them — `www` declares no AWS dependency at all, and the repo's only `@aws-sdk`
 * consumers are `service/src/lib/sources/s3/index.js` and
 * `service/src/serverless/util/loadServerlessSecrets.js`. Minting a role for a job with nothing to
 * authorise would be inventing the very cruft this workspace exists to remove; the credentials are
 * simply deleted instead.
 */
export const serviceDeployRoleArn = serviceDeployRole.arn;

/** The ARN `.github/workflows/infrastructure.yml` assumes to run `pulumi preview` on a PR. */
export const infrastructurePreviewRoleArn: pulumi.Output<string> | undefined =
    infrastructurePreviewRole?.arn;

/**
 * Which of `service/env.yml`'s 13 secrets this stack has a value for, and which it does not.
 *
 * NOTE-RT: exported so the gap is visible in `pulumi stack output` rather than only in a preview
 * warning nobody scrolls back to. Anything listed in `unmanagedSecrets` must stay out of
 * `provider.environmentSecrets` in `service/serverless.yml` — `throwOnMissingSecret: true` turns a
 * missing parameter into a total outage, not a degraded source.
 */
export const managedSecrets = managedSecretNames;
export const unmanagedSecrets = unmanagedSecretNames;

/**
 * The ARNs `service/env.yml` currently spells out as literals, so there is one place to read them
 * from. `prd`'s certificate is in `us-east-1` while `prd` itself deploys to `ca-central-1` — that
 * is correct for an edge-optimized custom domain, and exporting both makes it a stated fact rather
 * than something a reader has to notice.
 */
export const acmCertificateArn = apiCertificateArn;
export const kmsKeyArn = secretsKmsKeyArn;
export const route53ZoneId = hostedZoneId;

/**
 * The repository-level configuration, exported so `pulumi stack output` answers "is `master`
 * actually protected, and which environments can deploy?" without opening the GitHub UI.
 */
export const deploymentEnvironments = environments.map(environmentResource => environmentResource.environment);
export const masterRulesetId = masterRuleset?.rulesetId;
export const secretsRetired = retiredSecretsList;
