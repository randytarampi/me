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
export const apiCertificate = aws.acm.getCertificateOutput({
    domain: stage === "prd" ? "*.randytarampi.ca" : "*.dev.randytarampi.ca",
    statuses: ["ISSUED"],
    mostRecent: true
}, {provider: usEast1});

/** The key this stage's SecureString parameters are encrypted under. */
export const secretsKmsAlias = aws.kms.getAliasOutput({
    name: `alias/serverless-${stage}`
});

/** The zone every `*.randytarampi.ca` record — including `service.` — is created in. */
export const hostedZone = aws.route53.getZoneOutput({
    name: "randytarampi.ca.",
    privateZone: false
});

export const apiCertificateArn: pulumi.Output<string> = apiCertificate.arn;
export const secretsKmsKeyArn: pulumi.Output<string> = secretsKmsAlias.targetKeyArn;
export const hostedZoneId: pulumi.Output<string> = hostedZone.zoneId;
