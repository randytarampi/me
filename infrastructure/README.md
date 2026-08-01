# `@randy.tarampi/infrastructure`

The identity, access and repository configuration this monorepo depends on, declared instead of
clicked.

Everything in here used to be live account state in three different providers, which meant it could
not be reviewed, diffed, or drift-checked — and in practice meant it drifted for four years. The
seven GitHub secrets the workflows reference were all last set on **2022-04-23**.

## The boundary

**Pulumi owns identity, access and repository configuration. `service/serverless.yml` owns the
application.**

That line is not stylistic. The posts S3 bucket, both DynamoDB tables, the SNS dead-letter topic,
the six CloudWatch alarms and the API Gateway custom domain stay in `serverless.yml`, because their
lifecycle is the service's. Moving them here would put two tools in a fight over one CloudFormation
stack, and CloudFormation always wins that fight by deleting something.

## What's here

| Module | Owns |
| --- | --- |
| `src/aws/oidc.ts` | The GitHub Actions OIDC provider, `me-deploy-service-<stage>`, `me-infrastructure-preview` |
| `src/aws/secrets.ts` | The 13 SSM parameters `service` reads, plus the Serverless licence key |
| `src/aws/secretNames.ts` | Just the names, so the IAM policy can enumerate them without declaring them |
| `src/aws/adopted.ts` | Read-only lookups of the ACM certificate, KMS alias and Route53 zone `env.yml` hardcodes |
| `src/github/environments.ts` | `dev` and `prd`, with `master`-only deployment branch policies |
| `src/github/rulesets.ts` | `master` branch protection and `v*` tag protection |
| `src/github/repository.ts` | The Actions allowlist, and a `gh api` shim for Pages **Enforce HTTPS** |
| `src/github/secrets.ts` | The live secret inventory, and deletion of the five dead ones |
| `src/npm/trustedPublishers.ts` | npm trusted publishing for all 13 publishable workspaces |

## Two stacks, one of which owns the globals

`dev` and `prd`, matching the stage names `service/env.yml` and the deploy workflows already use.

IAM and GitHub have no notion of a stage, so `prd` carries `me:ownsGlobalResources: true` and is the
only stack that declares the OIDC provider, the rulesets, the environments, the secret inventory,
the Pages settings and the npm trust relationships. `dev` references what `prd` created. Without
that split, the second `pulumi up` fails with `EntityAlreadyExists` and wedges a stack permanently.

## Bootstrap

**The ordering is genuinely circular and getting it wrong is unrecoverable.** Creating the OIDC role
requires AWS credentials, and the only credentials that exist today are the ones being retired.

1. **Create the state bucket**, once, with the existing admin credentials:

   ```bash
   aws s3 mb s3://randytarampi-me-pulumi-state --region us-east-1
   aws s3api put-bucket-versioning \
     --bucket randytarampi-me-pulumi-state \
     --versioning-configuration Status=Enabled
   ```

   The bucket is not created by this program: it has to exist before the program that would create
   it has anywhere to keep its own state.

2. **Initialise the stacks**, using the KMS keys that already exist for `serverless-secrets`:

   ```bash
   cd infrastructure
   pulumi stack init dev --secrets-provider="awskms://alias/serverless-dev?region=us-east-1"
   pulumi stack init prd --secrets-provider="awskms://alias/serverless-prd?region=ca-central-1"
   ```

   Both commands add `secretsprovider` and `encryptedkey` to the committed `Pulumi.<stack>.yaml`.
   Commit them: `encryptedkey` is a KMS-encrypted data key, not a secret in the clear.

3. **Apply `prd`, then `dev`.** `prd` owns the globals, so it goes first.

4. **Prove the role works before deleting anything.** Switch `deploy.service.yml` to
   `role-to-assume` (already done), run it via `workflow_dispatch`, and confirm the
   `aws sts get-caller-identity` step prints an ARN of the form
   `…:assumed-role/me-deploy-service-prd/…`.

5. **Only then** retire the old keys:

   ```bash
   pulumi config set --stack prd me:retireAwsAccessKeys true
   pulumi up --stack prd
   ```

   Deleting them before step 4 passes leaves no credential with which to create the replacement.

## Two things that cannot be automated

**Creating the GitHub App.** There is no API for creating a GitHub App, so this one click stays
manual. It replaces `GH_PAGES_DEPLOYMENT_TOKEN` — a classic PAT with no expiry and write access to
three repositories, unchanged since 2022. OIDC genuinely cannot help here: the Pages deploy pushes
to `randytarampi/randytarampi.github.io` and `randytarampi/me.resume`, and GitHub's OIDC subject is
bound to the *calling* repository.

1. Create an App with `Contents: write` on the two satellite repositories.
2. Install it on both.
3. `pulumi config set --stack prd --secret me:githubSecret.GH_PAGES_DEPLOYMENT_TOKEN '…'` in the
   interim, or switch `deploy.pages.reusable.yml` to `actions/create-github-app-token` and store the
   App id and private key instead.

**Obtaining the Serverless Framework licence key.** Get it from the Serverless dashboard, then:

```bash
pulumi config set --stack prd --secret 'me:secret./serverless-framework/license-key' '…'
```

It goes to SSM rather than to a GitHub secret, because the deploy role already needs
`ssm:GetParameter` for `serverless-secrets`.

## Configuration

| Key | Default | Notes |
| --- | --- | --- |
| `me:stage` | — | `dev` or `prd`. Must match the GitHub environment name; the OIDC trust policy is pinned to it. |
| `me:ownsGlobalResources` | `false` | `true` on `prd` only. |
| `me:requiredStatusCheck` | unset | The `master` ruleset's required check. **Read it off a real green run**, don't guess — for a called workflow the check surfaces under the *caller's* job name. |
| `me:retireAwsAccessKeys` | `false` | Deletes the 2022 AWS secrets. Flip only after step 4 above. |
| `me:npmTrustDryRun` | `true` | npm permits one trust configuration per package; a wrong one is revoked by id, not overwritten. Read the dry run first. |
| `me:secret.<parameter-name>` | unset | An SSM SecureString value. Unset parameters are skipped, not defaulted. |
| `me:githubSecret.<NAME>` | unset | A GitHub Actions secret value. Same. |

## One-offs this program can't do

Pulumi will not delete what it never created, so a few things are a single manual command:

```bash
# The `production` environment, referenced by nothing since release.yml moved to `prd`.
gh api --method DELETE repos/randytarampi/me/environments/production
```

The five dead Actions secrets *are* handled — `src/github/secrets.ts` deletes them with a command
rather than leaving them to a README nobody re-reads.

## Verifying

```bash
yarn workspace @randy.tarampi/infrastructure run build    # tsc --noEmit
cd infrastructure && pulumi preview --diff --stack prd
```

The preview must report **zero replaces and zero deletes** against the ACM certificate, KMS alias
and hosted zone. A replace on the KMS key is a stop-the-line failure: it would make every
`serverless-secrets` value permanently unreadable.

After configuring npm trusted publishing, verify it rather than assuming it. Lerna's OIDC helper
never throws, so a misconfigured trust relationship looks exactly like an ordinary auth failure —
run `lerna publish --loglevel verbose` and look for the `oidc` breadcrumbs. Their absence is the
only signal that the exchange was skipped.
