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
