/**
 * The SSM parameters `service` reads, keyed by the environment variable each one lands in.
 *
 * NOTE-RT: names only, in their own module with no resources in it, so `oidc.ts` can scope the
 * deploy role's `ssm:GetParameters` to exactly this list without importing — and therefore
 * declaring — the parameters themselves.
 *
 * These are the exact values of `environmentSecrets` in `service/env.yml`, and they are deliberately
 * flat rather than `/<stage>/`-prefixed: `serverless-secrets` passes the name to `ssm:GetParameters`
 * verbatim (`node_modules/serverless-secrets/lib/providers/aws.js`), so a path prefix would just
 * mean the plugin looks for something that isn't there. `dev` and `prd` don't collide because they
 * live in different regions, not because they have different names.
 *
 * The list is the *whole* set, including the six sources `provider.environmentSecrets` does not yet
 * name. That asymmetry is the point: `custom.serverlessSecrets.throwOnMissingSecret` is `true`, so
 * naming a parameter in `serverless.yml` before it exists takes down every function, not just the
 * one source. Declaring them here is what makes it safe to finish that wiring.
 */
export const serviceSecretNames: Readonly<Record<string, string>> = {
    FLICKR_API_KEY: "flickr-api-key",
    FLICKR_API_SECRET: "flickr-api-secret",
    UNSPLASH_API_KEY: "unsplash-api-key",
    UNSPLASH_API_SECRET: "unsplash-api-secret",
    TUMBLR_API_KEY: "tumblr-api-key",
    TUMBLR_API_SECRET: "tumblr-api-secret",
    GITHUB_API_KEY: "github-api-key",
    GITHUB_API_SECRET: "github-api-secret",
    YOUTUBE_API_KEY: "youtube-api-key",
    VIMEO_ACCESS_TOKEN: "vimeo-access-token",
    STACKOVERFLOW_API_KEY: "stackoverflow-api-key",
    SOUNDCLOUD_ACCESS_TOKEN: "soundcloud-access-token",
    SENTRY_DSN: "sentry-dsn"
};

/**
 * The Serverless Framework v4 licence key, which v4.4.19+ reads from SSM.
 *
 * NOTE-RT: this is why there is no `SERVERLESS_ACCESS_KEY` GitHub secret. The deploy role already
 * needs `ssm:GetParameter` for `serverless-secrets`, so putting the licence key on the same path
 * costs nothing and leaves one fewer credential to rotate.
 *
 * @see https://www.serverless.com/framework/docs/guides/license-keys
 */
export const serverlessLicenseKeyParameterName = "/serverless-framework/license-key";
