const {GetParametersCommand, SSMClient} = require("@aws-sdk/client-ssm");
const fs = require("fs");
const path = require("path");

const CONFIG_FILE_NAME = ".serverless-secrets.json";

const loadConfig = () => {
    const configPath = path.join(process.cwd(), CONFIG_FILE_NAME);

    return JSON.parse(fs.readFileSync(configPath, "utf8"));
};

const getStage = () => {
    return process.env.NODE_ENV || "local";
};

const getSecrets = async (client, parameterNames) => {
    const names = Array.isArray(parameterNames) ? parameterNames : [parameterNames];
    const secrets = {};

    for (let index = 0; index < names.length; index += 10) {
        const params = {
            Names: names.slice(index, index + 10),
            WithDecryption: true
        };

        const {Parameters = []} = await client.send(new GetParametersCommand(params));

        for (const parameter of Parameters) {
            secrets[parameter.Name] = parameter.Value;
        }
    }

    return secrets;
};

module.exports = () => {
    if (process.env.NODE_ENV === "test") {
        return Promise.resolve();
    }

    const secrets = loadConfig();
    const mergedOptions = Object.assign({}, secrets.options);
    const environmentSecrets = Object.assign(
        {},
        secrets.environments.$global,
        secrets.environments[getStage()]
    );
    const parameterNames = [...new Set(Object.values(environmentSecrets))];
    const client = new SSMClient(Object.assign({}, {
        region: mergedOptions.providerOptions && mergedOptions.providerOptions.region
            ? mergedOptions.providerOptions.region
            : process.env.AWS_DEFAULT_REGION || "us-east-1"
    }));

    return getSecrets(client, parameterNames)
        .then(data => {
            const missingParameters = Object.entries(environmentSecrets)
                .filter(([, parameterName]) => !data[parameterName])
                .map(([envVarName]) => envVarName);

            Object.assign(process.env, Object.fromEntries(Object.entries(environmentSecrets).map(([envVarName, parameterName]) => {
                return [envVarName, data[parameterName]];
            })));

            if (missingParameters.length) {
                const message = `Secrets could not be obtained for the following environment variables: ${missingParameters.join(", ")}`;

                if (mergedOptions.logOnMissingSecret) console.log(message);
                if (mergedOptions.throwOnMissingSecret) throw new Error(message);
            }
        });
};
module.exports.default = module.exports;
