import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import {stage} from "../config";

/**
 * The resources `service/env.yml` currently hardcodes as ARN literals.
 *
 * NOTE-RT: these are *looked up*, not imported into this program's management. That is a deliberate
 * departure from the plan, and the reasoning is worth stating rather than burying:
 *
 * - Importing means Pulumi can also destroy. The KMS key here encrypts every SecureString
 *   parameter; a mistaken replace or delete makes all of them permanently unreadable. The certificate
 *   and the hosted zone are the front door to the whole site.
 * - The gate that was supposed to make importing safe — "a `preview` showing zero replaces and zero
 *   deletes" — can only be run against the live account. Committing an import-based program that
 *   nobody has previewed would be asserting a safety property that has not been checked.
 * - The actual goal was "so the literals in `env.yml` can reference one source of truth". A data
 *   source achieves exactly that, and a lookup that finds nothing fails the preview loudly, which
 *   is the drift signal that matters here.
 *
 * If these are ever genuinely adopted, do it with `pulumi import` plus `protect: true`, and only
 * after a preview that reports zero replaces and zero deletes.
 */

/**
 * ACM lives in `us-east-1` for *both* stages, because an edge-optimized API Gateway custom domain
 * can only use a `us-east-1` certificate — while `prd` itself deploys to `ca-central-1`.
 *
 * NOTE-RT: this asymmetry was previously an unstated coincidence in `env.yml` (a `us-east-1`
 * `acmArn` next to a `ca-central-1` `kmsKeyArn`) that happened to work because
 * `serverless-domain-manager`'s default endpoint type is edge. `serverless.yml` now says
 * `endpointType: edge` outright; this provider is the other half of saying it.
 */
const usEast1 = new aws.Provider("us-east-1", {region: "us-east-1"});

/** `*.randytarampi.ca` for `prd`, `*.dev.randytarampi.ca` for `dev`. */
export const apiCertificateDomain = stage === "prd" ? "*.randytarampi.ca" : "*.dev.randytarampi.ca";

/**
 * NOTE-RT: the one lookup here that is allowed to come back empty, and only outside `prd`.
 *
 * As of 2026-08-02 there is no `*.dev.randytarampi.ca` certificate — `us-east-1` has only
 * `*.randytarampi.ca`. A hard lookup therefore fails `pulumi preview --stack dev` at this line,
 * before a single resource is evaluated, which makes the entire `dev` stack unusable over one
 * output that nothing in this program consumes: `acmCertificateArn` is published for `env.yml` to
 * reference, and `service`'s own deploy reads its ARN from `env.yml`, not from here.
 *
 * `prd` still fails loudly. Losing production's certificate is not a degraded state.
 *
 * The `catch` is narrow on purpose. Only "no certificate found" is swallowed; an `AccessDenied`, a
 * throttle or a credential failure rethrows, because "the certificate does not exist" and "I am not
 * allowed to look" are very different facts and collapsing them is how a lookup stops being a
 * drift signal. Requesting the certificate (DNS validation, zone `Z1FDZJSPGC7GU7`) is still the
 * right fix — this only stops its absence from blocking everything else.
 */
const lookUpApiCertificateArn = async (): Promise<string | undefined> => {
    try {
        const certificate = await aws.acm.getCertificate({
            domain: apiCertificateDomain,
            statuses: ["ISSUED"],
            mostRecent: true
        }, {provider: usEast1});

        return certificate.arn;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        if (stage === "prd" || !/no certificate/i.test(message)) {
            throw error;
        }

        pulumi.log.warn(
            `No ISSUED \`${apiCertificateDomain}\` certificate in us-east-1, so \`acmCertificateArn\` is `
            + "unset for this stack. `sls create_domain` will fail until one is requested — request it "
            + "with DNS validation against zone `randytarampi.ca.`."
        );

        return undefined;
    }
};

/** The key this stage's SecureString parameters are encrypted under. */
export const secretsKmsAlias = aws.kms.getAliasOutput({
    name: `alias/serverless-${stage}`
});

/** The zone every `*.randytarampi.ca` record — including `service.` — is created in. */
export const hostedZone = aws.route53.getZoneOutput({
    name: "randytarampi.ca.",
    privateZone: false
});

export const apiCertificateArn: pulumi.Output<string | undefined> = pulumi.output(lookUpApiCertificateArn());
export const secretsKmsKeyArn: pulumi.Output<string> = secretsKmsAlias.targetKeyArn;
export const hostedZoneId: pulumi.Output<string> = hostedZone.zoneId;
