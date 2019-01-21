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

```
brew install nvm
nvm install 8
```

# Installation

```
npm install
```

You'll also need to define some variables in a [`env.yml`](https://github.com/randytarampi/me.posts/blob/master/env.yml) file.

```yml
dev: &devConfig
  profile: serverless-dev
  resourceStageBuilder: dev
  domainName: <where you want your service to be served from>
  acmArn: <an ACM ARN so serverless can setup for HTTPS>
  kmsKeyArn: <a KMS ARN so serverless-secrets can pull API keys and other `environmentSecrets` out of the SSM store>
  environment: &environment
    FLICKR_USER_NAME:
    UNSPLASH_USER_NAME:
    INSTAGRAM_AUTH_CALLBACK_URI:
    TUMBLR_USER_NAME:
  environmentSecrets: &environmentSecrets
    FLICKR_API_KEY: flickr-api-key
    FLICKR_API_SECRET: flickr-api-secret
    UNSPLASH_API_KEY: unsplash-api-key
    UNSPLASH_API_SECRET: unsplash-api-secret
    INSTAGRAM_API_KEY: instagram-api-key
    INSTAGRAM_API_SECRET: instagram-api-secret
    INSTAGRAM_ACCESS_TOKEN: instagram-access-token
    TUMBLR_API_KEY: tumblr-api-key
    TUMBLR_API_SECRET: tumblr-api-secret
    SENTRY_DSN: sentry-dsn
```

For each key in `environmentSecrets`, you'll want to push a value into an AWS SSM store with `serverless secrets`.

```bash
serverless secrets set -n <key name> -t <secret value> -k <alias/serverless-dev|alias/serverless-prd>
```

Or you can take the top level `config/template.secrets.yml`, fill it in accordingly and run the `bin/secretsUpload` script for some AWS region.

```bash
cp ../../config/template.secrets.yml ../../config/.secrets.<AWS_REGION>.yml # Create a region specific template file

# Populate the relevant fields as necessary...

../../bin/secretsUpload --region AWS_REGION
```

# Usage

```
npm start
open http://localhost:3006/cache/posts
```

# Testing

```
npm test
```

# Deployment

```
npm run deploy
```
