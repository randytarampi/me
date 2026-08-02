import * as pulumi from "@pulumi/pulumi";

import {apiCertificateArn, hostedZoneId, secretsKmsKeyArn} from "./aws/adopted";
import {infrastructurePreviewRole, serviceDeployRole} from "./aws/oidc";
import {managedSecretNames, unmanagedSecretNames} from "./aws/secrets";
import {githubRepositoryFullName, stage} from "./config";
import {environments} from "./github/environments";
import "./github/repository";
import {masterRuleset} from "./github/rulesets";
import {retiredSecretsList} from "./github/secrets";
import {publishableWorkspaces} from "./npm/trustedPublishers";

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
 * warning nobody scrolls back to. Anything listed in `unmanagedSecrets` still has a `${ssm:…}`
 * reference in `service/env.yml`'s `provider.environment` with no parameter behind it, and an
 * unresolvable reference fails the whole deploy — so this list is the set of things to supply
 * before the next `sls deploy`, not a set of merely degraded sources.
 */
export const managedSecrets = managedSecretNames;
export const unmanagedSecrets = unmanagedSecretNames;

/**
 * The ARNs `service/env.yml` currently spells out as literals, so there is one place to read them
 * from. `prd`'s certificate is in `us-east-1` while `prd` itself deploys to `ca-central-1` — that
 * is correct for an edge-optimized custom domain, and exporting both makes it a stated fact rather
 * than something a reader has to notice.
 *
 * NOTE-RT: `acmCertificateArn` can be `undefined`, on `dev` only — an empty value means no ISSUED
 * certificate exists for that stage's domain and `sls create_domain` will fail until one is
 * requested. See `src/aws/adopted.ts`; on `prd` a missing certificate is still a hard error.
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

/**
 * The workspaces `release.yml` publishes through npm trusted publishing rather than a token.
 *
 * NOTE-RT: verifying this one is not optional. Lerna's OIDC helper never throws — a misconfigured
 * trusted publisher does not produce an OIDC error, it produces a generic auth failure much later.
 * Run `lerna publish --loglevel verbose` and look for the `oidc` breadcrumbs; their *absence* is
 * the only signal that the exchange was skipped.
 */
export const trustedPublishers = publishableWorkspaces;
