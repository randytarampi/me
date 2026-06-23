const js = require("@eslint/js");
const importPlugin = require("eslint-plugin-import");
const reactPlugin = require("eslint-plugin-react");
const globals = require("globals");

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

module.exports = [
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/es5/**",
            "**/esm/**",
            "**/docs/**",
            "**/coverage/**",
            "**/.nyc_output/**",
            "**/.serverless/**",
            "**/.webpack/**",
            "**/.dynamodb/**",
            "**/.idea/**"
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
            ecmaVersion: 2022,
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
            }
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
    }
];
