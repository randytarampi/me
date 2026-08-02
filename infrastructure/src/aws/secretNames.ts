/**
 * The SSM parameters `service` reads, keyed by the environment variable each one lands in.
 *
 * NOTE-RT: names only, in their own module with no resources in it, so `oidc.ts` can scope the
 * deploy role's `ssm:GetParameters` to exactly this list without importing — and therefore
 * declaring — the parameters themselves.
 *
 * These are the exact names `service/env.yml` references as `${ssm:<name>}` under
 * `provider.environment`, resolved by whoever runs the deploy rather than by the function. They are
 * deliberately flat rather than `/<stage>/`-prefixed, because `dev` and `prd` are separated by
 * region, not by namespace — and because that is how the parameters were created in 2022, so a
 * prefix would mean looking for something that isn't there.
 *
 * The list is the whole set of thirteen. It used to be larger than what `serverless.yml` named,
 * because the old `serverless-secrets` plugin's `throwOnMissingSecret` turned one absent parameter
 * into a runtime outage across every function; with `${ssm:…}` an absent parameter fails the deploy
 * instead, so `env.yml` now names all thirteen and the two lists agree.
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
 * needs `ssm:GetParameter` to resolve the `${ssm:…}` references in `env.yml`, so putting the licence
 * key on the same path costs nothing and leaves one fewer credential to rotate.
 *
 * @see https://www.serverless.com/framework/docs/guides/license-keys
 */
export const serverlessLicenseKeyParameterName = "/serverless-framework/license-key";
