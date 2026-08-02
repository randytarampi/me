```plaintext
███╗   ███╗███████╗   ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗
████╗ ████║██╔════╝   ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝
██╔████╔██║█████╗     ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗
██║╚██╔╝██║██╔══╝     ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝
██║ ╚═╝ ██║███████╗██╗███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗
╚═╝     ╚═╝╚══════╝╚═╝╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝
```

A post aggregator/blog thingy. For some usernames at some popular services, pull their posts and display them nicely.

Currently supports:
- [Unsplash](https://unsplash.com/documentation)
- [Flickr](https://www.flickr.com/services/api/)
- [Instagram](https://www.instagram.com/developer/)
- [S3](https://github.com/Automattic/knox)
- [Tumblr](https://www.tumblr.com/docs/en/api/v2)

Scan some post sources for posts, then display them on a single page.

# Dependencies

See the [`me` dependencies](../../README.md#Dependencies).

# Installation

See the [`me` installation instructions](../../README.md#Installation).

You'll also need to define some variables in a [`env.yml`](https://github.com/randytarampi/me.posts/blob/master/env.yml) file.

```yml
dev: &devConfig
  profile: serverless-dev
  domainName: <where you want your service to be served from>
  acmArn: <an ACM ARN so serverless can setup for HTTPS>
  kmsKeyArn: <a KMS ARN, so SSM can decrypt the SecureString parameters below>
  environment: &environment
    FLICKR_USER_NAME:
    UNSPLASH_USER_NAME:
    TUMBLR_USER_NAME:
    FLICKR_API_KEY: ${ssm:flickr-api-key}
    FLICKR_API_SECRET: ${ssm:flickr-api-secret}
    UNSPLASH_API_KEY: ${ssm:unsplash-api-key}
    UNSPLASH_API_SECRET: ${ssm:unsplash-api-secret}
    TUMBLR_API_KEY: ${ssm:tumblr-api-key}
    TUMBLR_API_SECRET: ${ssm:tumblr-api-secret}
    SENTRY_DSN: ${ssm:sentry-dsn}
```

The credentials are ordinary `environment` entries — Serverless v4 resolves `${ssm:…}` at deploy time and decrypts `SecureString` parameters itself. There is no `environmentSecrets` block and no plugin; the values are baked into the CloudFormation template by whoever runs the deploy, so the function never talks to Parameter Store.

Declare the parameters rather than pushing them by hand. `infrastructure/src/aws/secrets.ts` owns every one of them, so the values live encrypted in the stack's config and `pulumi preview` tells you which are still missing:

```bash
cd ../infrastructure
pulumi config set --stack prd --secret me:secret.flickr-api-key '…'
pulumi up --stack prd
```

This replaces `bin/secretsUpload.js`, which read `TRAVIS_BUILD_DIR` and still pointed at the pre-relocation `packages/service`.

> **A missing parameter fails the deploy, not the function.** `${ssm:…}` carries no default on purpose: an unresolvable reference stops `sls deploy` before anything is published, which is a far better failure than a live function holding a credential that merely looks present.

> **The resolved values end up in the CloudFormation template**, which lives in the Serverless deployment bucket and is visible in the Lambda console. That bucket must block public access and be encrypted, and no workflow may run `sls deploy --verbose` — it would print the rendered template into a CI log.

# Usage

```
# From the `me` monorepo root
yarn lerna run start --scope=@randy.tarampi/service
open http://localhost:3006/cache/posts
```

# Testing

```
# From the `me` monorepo root
yarn lerna run test --scope=@randy.tarampi/service
```

# Deployment

```
# From the `me` monorepo root
yarn lerna run deploy --scope=@randy.tarampi/service
```
