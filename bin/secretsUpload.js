#!/usr/bin/env node

const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const jsyaml = require("js-yaml");
const commander = require("commander");
const packageJson = require("../package.json");

const REPO_ROOT = process.env.REPO_ROOT || process.env.TRAVIS_BUILD_DIR || path.join(__dirname, "..");
const POSTS_ROOT = path.join(REPO_ROOT, "packages/posts");
const CONFIG_ROOT = path.join(REPO_ROOT, "config");

const uploadSecretForRegion = region => (secretTextOrObject, secretName) => new Promise((resolve, reject) => {
    const slsArguments = [
        "npx sls secrets set",
    ];

    if (typeof secretTextOrObject === "string") {
        slsArguments.push(`--name '${secretName}'`);
        slsArguments.push(`--text '${secretTextOrObject}'`);
        slsArguments.push(`--region '${region}'`);
    } else {
        if (secretTextOrObject.name) {
            slsArguments.push(`--name '${secretTextOrObject.name}'`);
        } else {
            slsArguments.push(`--name '${secretName}'`);
        }

        if (secretTextOrObject.region) {
            slsArguments.push(`--region '${secretTextOrObject.region}'`);
        } else {
            slsArguments.push(`--region '${region}'`);
        }

        if (secretTextOrObject.key) {
            slsArguments.push(`--key '${secretTextOrObject.key}'`);
        } else if (commander.key) {
            slsArguments.push(`--key '${commander.key}'`);
        }

        if (secretTextOrObject.text) {
            slsArguments.push(`--text '${secretTextOrObject.text}'`);
        }

        if (secretTextOrObject.file) {
            slsArguments.push(`--file '${secretTextOrObject.file}'`);
        }

        if (secretTextOrObject.key) {
            slsArguments.push(`--key '${secretTextOrObject.key}'`);
        }

        if (secretTextOrObject.description) {
            slsArguments.push(`--description '${secretTextOrObject.description}'`);
        }
    }

    const slsCommandOptions = {
        cwd: POSTS_ROOT
    };

    const slsCommand = slsArguments.join(" ");

    console.debug(`Running \`${slsCommand}\``); // eslint-disable-line no-console

    childProcess.exec(slsCommand, slsCommandOptions, error => {
        if (error) {
            console.debug(`Error running \`${slsCommand}\``); // eslint-disable-line no-console
            return reject(error);
        }

        console.debug(`Ran \`${slsCommand}\` successfully`); // eslint-disable-line no-console
        resolve();
    });
});

commander
    .version(packageJson.version)
    .usage("<region> [options]")
    .description("Upload your secrets in bulk to the same AWS EC2 Parameter Store used by serverless-secrets in `posts` ")
    .option("-k, --key <string>", "The ID or alias for the AWS KMS key that we want to use to encrypt these secrets")
    .action(region => {
        if (!region) {
            console.error("Please supply a region"); // eslint-disable-line no-console
            process.exit(1);
        }

        const secretsConfigPath = path.join(CONFIG_ROOT, `.secrets.${region}.yml`);
        let secretsConfig;

        try {
            secretsConfig = fs.readFileSync(secretsConfigPath, "utf8");
        } catch (error) {
            if (error.code === "ENOENT") {
                console.error(`Could not open ${secretsConfigPath}`); // eslint-disable-line no-console
            } else {
                console.error(error); // eslint-disable-line no-console
            }
            process.exit(1);
        }

        const secretsYaml = jsyaml.safeLoad(secretsConfig);

        Promise.all(_.map(secretsYaml, uploadSecretForRegion(region)))
            .then(() => {
                console.log("Secrets upload success"); // eslint-disable-line no-console
                process.exit(0);
            })
            .catch(error => {
                console.error(error, "Secrets upload failed"); // eslint-disable-line no-console
                process.exit(1);
            });
    })
    .parse(process.argv);
