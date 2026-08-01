import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

const buildGlobals = {
    Promise: "readonly",
    __BUILD_IS_DEVELOPMENT__: "readonly",
    __BUILD_IS_PUBLISHED__: "readonly",
    __BUILD_NODE_ENV__: "readonly",
    __BUILD_BABEL_ENV__: "readonly",
    __ASSET_URL__: "readonly",
    __RESUME_ASSET_URL__: "readonly",
    __LETTER_ASSET_URL__: "readonly",
    __APP_URL__: "readonly",
    __CODE_APP_URL__: "readonly",
    __WORDS_APP_URL__: "readonly",
    __POSTS_APP_URL__: "readonly",
    __MAP_APP_URL__: "readonly",
    __PHOTOS_APP_URL__: "readonly",
    __RESUME_APP_URL__: "readonly",
    __LETTER_APP_URL__: "readonly",
    __POSTS_FEED_URL__: "readonly",
    __PHOTOS_SERVICE_URL__: "readonly",
    __WORDS_SERVICE_URL__: "readonly",
    __POSTS_SERVICE_URL__: "readonly",
    __RESUME_SERVICE_URL__: "readonly",
    __LETTER_SERVICE_URL__: "readonly",
    __PUBLISHED_RESUME_URL__: "readonly",
    __PUBLISHED_LETTER_URL__: "readonly",
    __CAMPAIGN_SOURCE__: "readonly",
    __CAMPAIGN_MEDIUM__: "readonly",
    __CAMPAIGN_NAME__: "readonly",
    __CAMPAIGN_TERM__: "readonly",
    __CAMPAIGN_CONTENT__: "readonly",
    __RESUME_STYLES_PATH__: "readonly",
    __LETTER_STYLES_PATH__: "readonly",
    __PRINTABLE_TEMPLATE_PATH__: "readonly",
    __RESUME_PACKAGE_NAME__: "readonly",
    __LETTER_PACKAGE_NAME__: "readonly",
    __ME_PERSON_NAME__: "readonly",
    __GCP_API_KEY__: "readonly",
    __SW_BUNDLE_PATH__: "readonly"
};

export default [
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/esm/**",
            "**/docs/**",
            "**/coverage/**",
            "**/.nyc_output/**",
            "**/.serverless/**",
            "**/.webpack/**",
            "**/.dynamodb/**",
            "**/.idea/**",
            // NOTE-RT: Yarn's own bundled releases. Linting `.yarn/releases/yarn-*.js` accounted for
            // 7,805 of the 8,376 problems `yarn lint` reported, which buried every real one.
            "**/.yarn/**"
        ]
    },
    js.configs.recommended,
    reactPlugin.configs.flat.recommended,
    {
        files: ["**/*.{js,jsx}"],
        plugins: {
            import: importPlugin
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.mocha,
                ...buildGlobals
            }
        },
        settings: {
            react: {
                version: "19.2"
            },
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".json"]
                }
            },
            // NOTE-RT: `eslint-import-resolver-node` predates package `exports` maps and only reads
            // `main`/`module`, so it cannot see these — all three are declared dependencies that
            // resolve fine at runtime. This is a resolver limitation, not a missing package.
            "import/core-modules": [
                "react-router",
                "@octokit/rest",
                "unsplash-js"
            ]
        },
        rules: {
            "no-useless-escape": "warn",
            eqeqeq: "error",
            semi: "error",
            quotes: ["error", "double"],
            "react/no-find-dom-node": "off",
            "react/no-unescaped-entities": "off",
            "react/prop-types": ["error", {ignore: ["children"]}],
            "import/named": "error",
            "import/export": "error",
            "import/no-mutable-exports": "error",
            "import/first": "error",
            "import/no-duplicates": "error",
            "import/no-unresolved": "error",
            "import/default": "error",
            "no-global-assign": "error"
        }
    },
    {
        // NOTE-RT: `.cjs` is how this repo spells "this file has to be CommonJS" — see
        // docs/CONVENTIONS.md. Without a block of its own, `require`/`module`/`__dirname` are
        // undefined globals: the twelve `mocha.config.cjs` files alone reported 17 each.
        files: ["**/*.cjs"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.commonjs
            }
        }
    }
];
