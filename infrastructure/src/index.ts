import * as pulumi from "@pulumi/pulumi";

import {infrastructurePreviewRole, serviceDeployRole} from "./aws/oidc";
import {githubRepositoryFullName, stage} from "./config";

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
