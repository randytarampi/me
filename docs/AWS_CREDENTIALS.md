# AWS Credentials

The agent shell has scrubbed AWS credentials (`__VG_AWS_…` placeholders in `~/.aws/credentials`). All AWS commands must be handed to the user as copy/paste blocks — the agent cannot execute them.

## Pattern

1. **Provide the exact command** as a standalone block the user can copy/paste.
2. **Ask the user to paste back the output** when the result is needed for diagnosis.
3. **Never assume AWS state** — always verify with a read-only command first.

## Common commands

### Verify credentials

```bash
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_DEFAULT_PROFILE
export AWS_PROFILE=default
aws sts get-caller-identity
```

### Pulumi preview

```bash
cd infrastructure
pulumi preview --diff --stack prd
pulumi preview --diff --stack dev
```

### Pulumi up

```bash
pulumi up --stack prd
pulumi up --stack dev
```

### Lambda invoke

```bash
aws lambda invoke --function-name service-dev-cachePosts --region us-east-1 /tmp/cachePosts-out.json
```

### CloudWatch logs

```bash
aws logs tail /aws/lambda/service-dev-cachePosts --since 5m --region us-east-1
aws logs tail /aws/lambda/service-dev-getPosts --since 10m --region us-east-1
```

### DynamoDB table check

```bash
aws dynamodb list-tables --region us-east-1
aws dynamodb describe-table --table-name dev-service-posts-2019-01-11 --region us-east-1
```

## When AWS output is needed for diagnosis

Provide the exact command and ask the user to paste the output back. Example:

> Run this and paste the output:
> ```bash
> aws logs tail /aws/lambda/service-dev-getPosts --since 10m --region us-east-1
> ```

## See also

- [Lambda debugging](LAMBDA_DEBUGGING.md) — the deploy→invoke→logs→fix cycle for Lambda runtime bugs.
