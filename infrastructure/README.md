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

The live `service-prd` stack already manages `prd-service-posts-2019-01-11` (1,666 items) and
`prd-service-authInfo-2019-01-18` under those exact names — confirmed 2026-08-02 against
`cloudformation get-template`. Nothing here adopts, imports or renames them, and nothing should:
a `TableName` change is a CloudFormation *replacement*. The names are declared once, in
`service/serverless.yml`'s `custom.postsTableNamesByStage`, and read from there by both the Lambda
environment variable and the table resource.

## What's here

| Module | Owns |
| --- | --- |
| `src/aws/oidc.ts` | The GitHub Actions OIDC provider, `me-deploy-service-<stage>`, `me-infrastructure-preview` |
| `src/aws/secrets.ts` | The 13 SSM parameters `service` reads, plus the Serverless licence key |
| `src/aws/secretNames.ts` | Just the names, so the IAM policy can enumerate them without declaring them |
| `src/aws/adopted.ts` | Read-only lookups of the ACM certificate, KMS alias and Route53 zone `env.yml` hardcodes |
| `src/github/environments.ts` | `dev` and `prd`, with `master`-only deployment branch policies and a required reviewer on `prd` |
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

0. **Reconnoitre first.** Every step below branches on something only the live account can answer,
   and all of these are read-only:

   ```bash
   aws sts get-caller-identity

   # Which SSM parameters already exist — they need `import`, not `config set`. Names only.
   for region in us-east-1 ca-central-1; do
     aws ssm describe-parameters --region "$region" \
       --query 'Parameters[].{Name:Name,Type:Type,Modified:LastModifiedDate}' --output table
   done

   # Everything `src/aws/adopted.ts` looks up. A lookup that finds nothing fails the preview.
   aws kms describe-key --key-id alias/serverless-dev --region us-east-1
   aws kms describe-key --key-id alias/serverless-prd --region ca-central-1
   aws acm list-certificates --region us-east-1 --certificate-statuses ISSUED \
     --query 'CertificateSummaryList[].{Domain:DomainName,Arn:CertificateArn}' --output table
   aws route53 list-hosted-zones-by-name --dns-name randytarampi.ca

   aws iam list-open-id-connect-providers          # expect []
   aws iam list-access-keys
   aws s3api head-bucket --bucket randytarampi-me-pulumi-state
   ```

   As of **2026-08-02**, in account `471964952458`, that returned:

   - **Nine of the thirteen service parameters already exist**, identically in both regions, dating
     to 2018-10-31: `flickr-api-{key,secret}`, `unsplash-api-{key,secret}`, `tumblr-api-{key,secret}`,
     `github-api-{key,secret}` and `sentry-dsn`. Four did not — `youtube-api-key`,
     `vimeo-access-token`, `stackoverflow-api-key`, `soundcloud-access-token` — nor did
     `/serverless-framework/license-key`, which was set directly in both regions on 2026-08-29 via
     the console rather than through `pulumi import`/`config set`; import it on both stacks anyway
     so Pulumi's state agrees with what is actually in SSM. The other four remain unset and that is
     fine now: every `${ssm:…}` reference in `service/env.yml` carries a `, ''` default (decided
     2026-08-29), so an unset parameter degrades the one source that needed it instead of failing
     the whole deploy — set them whenever a value shows up, not before.
   - **`*.dev.randytarampi.ca` was ISSUED in `us-east-1` on 2026-08-29** (DNS-validated against zone
     `Z1FDZJSPGC7GU7`, ARN `certificate/b7723060-01e4-4697-a94f-f8f3f761509a`), and `service/env.yml`
     now points at it. `src/aws/adopted.ts` still degrades rather than fails if a `dev` certificate
     is ever missing again, so the stack comes up either way — `acmCertificateArn` is simply empty
     and a warning says so when it is. On `prd` a missing certificate is still a hard error.
   - Both KMS aliases are `Enabled`, the hosted zone is `Z1FDZJSPGC7GU7`, there are no OIDC
     providers, and the state bucket does not exist. IAM user `rawr` had **two** active access keys
     as of the 2026-08-02 recon (2020-04-04 and 2026-01-13); the credentials configured locally on
     2026-08-29 use a third (`AKIAW3Y2NU6FEHK5TVWL`), which does not match either — re-run
     `aws iam list-access-keys` before retiring anything in step 6, and confirm against the
     `AWS_ACCESS_KEY_ID` repository secret specifically, not just what is active on this machine.

1. **Create the state bucket**, once, with the existing admin credentials:

   ```bash
   aws s3 mb s3://randytarampi-me-pulumi-state --region us-east-1
   aws s3api put-bucket-versioning \
     --bucket randytarampi-me-pulumi-state \
     --versioning-configuration Status=Enabled
   ```

   The bucket is not created by this program: it has to exist before the program that would create
   it has anywhere to keep its own state.

2. **Initialise the stacks**, using the KMS keys the SSM parameters have been encrypted under since 2022:

   ```bash
   cd infrastructure
   pulumi stack init dev --secrets-provider="awskms://alias/serverless-dev?region=us-east-1"
   pulumi stack init prd --secrets-provider="awskms://alias/serverless-prd?region=ca-central-1"
   ```

   Both commands add `secretsprovider` and `encryptedkey` to the committed `Pulumi.<stack>.yaml`.
   Commit them: `encryptedkey` is a KMS-encrypted data key, not a secret in the clear.

3. **Import the parameters that already exist, before setting any value.** `aws.ssm.Parameter` in
   `src/aws/secrets.ts` has no `overwrite`, so a create against an existing parameter fails the
   whole `up` with `ParameterAlreadyExists` — and that now includes the licence key, set directly
   through the console on 2026-08-29 rather than through this program:

   ```bash
   for p in flickr-api-key flickr-api-secret unsplash-api-key unsplash-api-secret \
            tumblr-api-key tumblr-api-secret github-api-key github-api-secret sentry-dsn \
            /serverless-framework/license-key; do
     pulumi import --stack prd --yes aws:ssm/parameter:Parameter "$p" "$p"
     pulumi import --stack dev --yes aws:ssm/parameter:Parameter "$p" "$p"
   done
   ```

   Both stacks, because the parameters exist in both regions and the stages are separated by region
   rather than by namespace. The four still-missing ones (`youtube-api-key`, `vimeo-access-token`,
   `stackoverflow-api-key`, `soundcloud-access-token`) don't need `pulumi config set` before the
   first `up` — every `${ssm:…}` reference in `service/env.yml` now degrades gracefully, so set
   them whenever a value turns up.

4. **Apply `prd`, then `dev`.** `prd` owns the globals, so it goes first.

   `pulumi up --stack prd` also runs three `command.local.Command` resources **on this machine** —
   `gh secret delete`, `gh api … /pages` for Enforce HTTPS, and the npm trust dry run — so `gh` and
   `npm` have to be authenticated here, not just AWS. The `@pulumi/github` provider reads
   `GITHUB_TOKEN`, falling back to `GH_TOKEN` if that's what's already exported — export
   `GITHUB_TOKEN="$(gh auth token)"` first if neither is set.

5. **Prove the role works before deleting anything.** Switch `deploy.service.yml` to
   `role-to-assume` (already done), run it via `workflow_dispatch`, and confirm the
   `aws sts get-caller-identity` step prints an ARN of the form
   `…:assumed-role/me-deploy-service-prd/…`.

   There is a chicken-and-egg problem here that costs an afternoon if you meet it live: step 4
   creates the `master`-only deployment branch policy, so a `workflow_dispatch` from the working
   branch you are about to merge is rejected by the environment *before the job starts*. Declare the
   exception, rehearse, then remove it:

   ```bash
   pulumi config set --stack prd --path 'me:devDeploymentBranches[0]' 'chore/shippable-backlog'
   pulumi up --stack prd
   gh workflow run deploy.service.yml --ref chore/shippable-backlog -f deployment_environment=dev
   # … once it has been seen working …
   pulumi config rm --stack prd --path 'me:devDeploymentBranches[0]'
   pulumi up --stack prd
   ```

   On the `prd` stack despite the name: environments are declared only when `ownsGlobalResources`,
   and a GitHub environment exists once per repository, not once per stage. Setting it on `dev` does
   nothing. It applies to the `dev` environment only — `prd` has no equivalent, deliberately.

6. **Only then** retire the old keys:

   ```bash
   pulumi config set --stack prd me:retireAwsAccessKeys true
   pulumi up --stack prd
   ```

   Deleting them before step 5 passes leaves no credential with which to create the replacement.
   `me:retireAwsAccessKeys` removes the *GitHub secrets*; the underlying IAM keys are a separate
   `aws iam delete-access-key`. Re-run `aws iam list-access-keys` immediately before this step and
   confirm which key id is actually in the `AWS_ACCESS_KEY_ID` repository secret — `rawr` has
   carried more than two over the life of this account, and the one active on whichever machine
   runs this command is not necessarily the one to delete.

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

Decided 2026-08-29: **stay on the interim PAT for now.** No App has been created; nothing in
`deploy.pages.reusable.yml` changes. Revisit once the App is worth the click.

**Obtaining the Serverless Framework licence key.** Get it from the Serverless dashboard, then:

```bash
pulumi config set --stack prd --secret 'me:secret./serverless-framework/license-key' '…'
```

It goes to SSM rather than to a GitHub secret, because the deploy role already needs
`ssm:GetParameter` to resolve the `${ssm:…}` credential references in `service/env.yml`.

**Already done, 2026-08-29** — set directly in SSM in both regions, through the console rather than
through this command. That means it needs `pulumi import`, not `pulumi config set` (see step 3
above), or the next `up` fails with `ParameterAlreadyExists`.

## Configuration

| Key | Default | Notes |
| --- | --- | --- |
| `me:stage` | — | `dev` or `prd`. Must match the GitHub environment name; the OIDC trust policy is pinned to it. |
| `me:ownsGlobalResources` | `false` | `true` on `prd` only. |
| `me:requiredStatusCheck` | unset | **Deprecated, unread.** Was meant to gate `master`'s ruleset on a named check; removed 2026-08-29 because rulesets enforce required status checks on *every* push to the ref, not just PR merges, which rejected `release.yml`'s own version-bump commit with no bypass actor available on this personal-owned repository (see `src/github/rulesets.ts`). Safe to `pulumi config rm` if already set. |
| `me:retireAwsAccessKeys` | `false` | Deletes the 2022 AWS secrets. Flip only after step 5 above. |
| `me:npmTrustDryRun` | `true` | npm permits one trust configuration per package; a wrong one is revoked by id, not overwritten. Read the dry run first. |
| `me:devDeploymentBranches` | `[]` | Extra branch patterns allowed to deploy to the **`dev`** environment, on top of `master`. Set on the **`prd`** stack. Temporary: for the pre-merge rehearsal only. |
| `me:secret.<parameter-name>` | unset | An SSM SecureString value. Unset parameters are skipped, not defaulted — and every `${ssm:…}` reference to one in `service/env.yml` resolves to `''`, so the source that needed it is simply switched off rather than blocking the deploy. |
| `me:githubSecret.<NAME>` | unset | A GitHub Actions secret value. Same. |

One of those thirteen values needs saying out loud, because it is the only one that also exists in
tracked configuration and can therefore drift silently:

```bash
pulumi config set --stack dev --secret me:secret.sentry-dsn \
  'https://5f246bd3456d477da7ebf2d4fd06f2bb@o159971.ingest.us.sentry.io/1240735'
pulumi config set --stack prd --secret me:secret.sentry-dsn \
  'https://5f246bd3456d477da7ebf2d4fd06f2bb@o159971.ingest.us.sentry.io/1240735'
```

`config/{dev,prd,printable}.yml` moved off the legacy pre-organisation-id `@sentry.io/1240735` host,
but the Lambda does not read those files — it reads `SENTRY_DSN` from `${ssm:sentry-dsn}`. Set the
parameter to the same value or the backend keeps reporting to the old host while the browser reports
to the new one, which is worse than either alone: the two halves of a trace stop meeting.

## `prd` requires an approval, and it costs two rounds

`src/github/environments.ts` puts a required reviewer on `prd` and none on `dev`. That is a
deliberate choice, not a default, and the consequence is worth knowing before a release rather than
during one: `release.yml:26` and `deploy.service.yml:41` **both** declare `environment: prd`, so a
single release stops twice —

1. before `release` versions, publishes and cuts the GitHub release;
2. before `deploy-pages`, `deploy-pages--jsonresume-theme` and `deploy-service`, which wait together
   as one round.

A release therefore never completes unattended. `canAdminsBypass` is `true`, so the bypass exists —
but taking it is a decision, which is the point.

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
SecureString parameter permanently unreadable.

After configuring npm trusted publishing, verify it rather than assuming it. Lerna's OIDC helper
never throws, so a misconfigured trust relationship looks exactly like an ordinary auth failure —
run `lerna publish --loglevel verbose` and look for the `oidc` breadcrumbs. Their absence is the
only signal that the exchange was skipped.
