// Seeds throwaway SSM parameters into LocalStack so `sls print` can resolve the
// `${ssm:…, ''}` references in env.yml without live AWS. Values are inert placeholders —
// the config render never uses them in tests; only resolution success matters.
// See service/package.json localstack:ssm:seed + service/test/unit/src/serverlessConfig.js.
import {GetParametersCommand, PutParameterCommand, SSMClient} from "@aws-sdk/client-ssm";

const endpoint = process.env.AWS_ENDPOINT_URL ?? "http://localhost:4566";

const ssm = new SSMClient({
    region: process.env.AWS_REGION ?? "us-east-1",
    endpoint,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "test",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "test"
    }
});

const parameterNames = [
    "sentry-dsn",
    "tumblr-api-key",
    "tumblr-api-secret",
    "flickr-api-key",
    "flickr-api-secret",
    "unsplash-api-key",
    "unsplash-api-secret"
];

const seededValue = "localstack-placeholder";

for (const name of parameterNames) {
    await ssm.send(new PutParameterCommand({
        Name: `/${name}`,
        Type: "String",
        Value: seededValue,
        Overwrite: true
    }));
    console.log(`seeded ssm /${name}`);
}

const verification = await ssm.send(new GetParametersCommand({
    Names: parameterNames.map(name => `/${name}`)
}));
const missing = verification.Parameters?.length !== parameterNames.length
    ? parameterNames.filter(name => !verification.Parameters?.some(parameter => parameter.Name === `/${name}`))
    : [];
if (missing.length) {
    throw new Error(`failed to seed local SSM parameters: ${missing.join(", ")}`);
}
console.log(`local SSM substrate ready (${parameterNames.length} parameters at ${endpoint})`);