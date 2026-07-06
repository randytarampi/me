import {createRequire} from "module";
import {join} from "path";
import util from "./util.js";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
const __filename = import.meta.filename;
process.env.NODE_CONFIG_DIR = join(__dirname, "config");

const config = require("config");
const {isDevelopment} = util;

const configuredMinifyReplace = [
    "minify-replace",
    {
        replacements: [
            {
                identifierName: "__BUILD_IS_DEVELOPMENT__",
                replacement: {
                    type: "booleanLiteral",
                    value: isDevelopment
                }
            },
            {
                identifierName: "__BUILD_IS_PUBLISHED__",
                replacement: {
                    type: "booleanLiteral",
                    value: process.env.IS_PUBLISHING ? process.env.IS_PUBLISHING === "true" : false
                }
            },
            {
                identifierName: "__BUILD_IS_GENERATING__",
                replacement: {
                    type: "booleanLiteral",
                    value: !!process.env.IS_PUBLISHING
                }
            },
            {
                identifierName: "__BUILD_NODE_ENV__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.NODE_ENV || ""
                }
            },
            {
                identifierName: "__BUILD_BABEL_ENV__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.BABEL_ENV || ""
                }
            },
            {
                identifierName: "__WORDS_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("posts.wordsUrl")
                }
            },
            {
                identifierName: "__POSTS_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("posts.postsUrl")
                }
            },
            {
                identifierName: "__PHOTOS_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("posts.photosUrl")
                }
            },
            {
                identifierName: "__RESUME_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("posts.resumeUrl")
                }
            },
            {
                identifierName: "__LETTER_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("posts.letterUrl")
                }
            },
            {
                identifierName: "__POSTS_FEED_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("posts.feedUrl")
                }
            },
            {
                identifierName: "__CODE_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.codeUrl")
                }
            },
            {
                identifierName: "__WORDS_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.wordsUrl")
                }
            },
            {
                identifierName: "__POSTS_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.postsUrl")
                }
            },
            {
                identifierName: "__MAP_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.mapUrl")
                }
            },
            {
                identifierName: "__PHOTOS_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.photosUrl")
                }
            },
            {
                identifierName: "__RESUME_ASSET_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("resume.assetUrl")
                }
            },
            {
                identifierName: "__RESUME_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.resumeUrl")
                }
            },
            {
                identifierName: "__PUBLISHED_RESUME_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("resume.publishUrl")
                }
            },
            {
                identifierName: "__LETTER_ASSET_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("letter.assetUrl")
                }
            },
            {
                identifierName: "__LETTER_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.letterUrl")
                }
            },
            {
                identifierName: "__PUBLISHED_LETTER_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("letter.publishUrl")
                }
            },
            {
                identifierName: "__ASSET_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.assetUrl")
                }
            },
            {
                identifierName: "__APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("www.publishUrl")
                }
            },
            {
                identifierName: "__ME_PERSON_NAME__",
                replacement: {
                    type: "stringLiteral",
                    value: (() => {
                        const name = config.get("me.person.name");
                        return typeof name === "function" ? name.call(config) : name;
                    })()
                }
            },
            {
                identifierName: "__CAMPAIGN_SOURCE__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.CAMPAIGN_SOURCE || config.get("me.campaign.source")
                }
            },
            {
                identifierName: "__CAMPAIGN_MEDIUM__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.CAMPAIGN_MEDIUM || config.get("me.campaign.medium")
                }
            },
            {
                identifierName: "__CAMPAIGN_NAME__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.CAMPAIGN_NAME || config.get("me.campaign.name")
                }
            },
            {
                identifierName: "__CAMPAIGN_TERM__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.CAMPAIGN_TERM || config.get("me.campaign.term")
                }
            },
            {
                identifierName: "__CAMPAIGN_CONTENT__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.CAMPAIGN_CONTENT || config.get("me.campaign.content")
                }
            },
            {
                identifierName: "__RESUME_STYLES_PATH__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.RESUME_STYLES_PATH || ""
                }
            },
            {
                identifierName: "__LETTER_STYLES_PATH__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.LETTER_STYLES_PATH || ""
                }
            },
            {
                identifierName: "__PRINTABLE_TEMPLATE_PATH__",
                replacement: {
                    type: "stringLiteral",
                    value: process.env.PRINTABLE_TEMPLATE_PATH || ""
                }
            },
            {
                identifierName: "__RESUME_PACKAGE_NAME__",
                replacement: {
                    type: "stringLiteral",
                    value: require("./packages/resume/package").name
                }
            },
            {
                identifierName: "__LETTER_PACKAGE_NAME__",
                replacement: {
                    type: "stringLiteral",
                    value: require("./packages/letter/package").name
                }
            },
            {
                identifierName: "__GCP_API_KEY__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("gcp.api.key")
                }
            }
        ]
    }
];

export default (api) => {
    let presets = [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                },
                modules: "commonjs"
            }
        ],
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
                development: isDevelopment
            }
        ]
    ];

    let plugins = [
        "lodash",
        configuredMinifyReplace,
        "@babel/plugin-transform-class-properties",
        "@babel/plugin-transform-object-rest-spread",
        "@babel/plugin-transform-property-literals"
    ];

    switch (api.env()) {
        case "test": {
            plugins.push("istanbul");
            break;
        }

        case "server": {
            presets = [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            node: "current"
                        },
                        modules: "commonjs"
                    }
                ],
                [
                    "@babel/preset-react",
                    {
                        runtime: "automatic",
                        development: isDevelopment
                    }
                ]
            ];
            break;
        }

        case "client":
        case "client.es5": {
            if (isDevelopment) {
                // NOTE-RT: `react-refresh/babel` has its own internal guard that independently
                // requires Babel's own env name (`api.env()`) to literally be "development", but this
                // repo's custom env-name scheme (`client`, `client.es5`, `client.esm`, ...) never uses
                // that literal value for real dev-server invocations. `isDevelopment` above is already
                // the authoritative, fail-safe (opt-in on `NODE_ENV`/`BABEL_ENV` === "development")
                // gate for this plugin, so it's safe to skip the plugin's own redundant internal check.
                plugins.push(["react-refresh/babel", {skipEnvCheck: true}]);
            }
            presets = [
                [
                    "@babel/preset-env",
                    {
                        forceAllTransforms: true,
                        modules: "commonjs"
                    }
                ],
                [
                    "@babel/preset-react",
                    {
                        runtime: "automatic",
                        development: isDevelopment
                    }
                ]
            ];
            break;
        }

        // NOTE-RT: `client.esm` is used for TWO genuinely different purposes that happen to share
        // this env name: (1) every package's own `build:babel:esm` script, which Babel-transpiles
        // `src` into a standalone `esm/` output directory that's still `require()`'d as CommonJS
        // elsewhere (its own `esm/package.json` explicitly declares `{"type": "commonjs"}`) - this
        // needs `modules: "commonjs"`, same as `publish`; and (2) `packages/www`'s own
        // `webpack.client.config.esm.js` dev-server bundle, which needs real ESM (`modules: false`)
        // for `react-refresh-webpack-plugin` interop (see the dedicated "client.esm.webpack" case
        // below). These must NOT share the same `modules` setting, so they're intentionally kept as
        // separate env names/cases instead of being merged.
        case "publish":
        case "client.esm": {
            if (isDevelopment) {
                // NOTE-RT: see the identical note in the "client"/"client.es5" case above.
                plugins.push(["react-refresh/babel", {skipEnvCheck: true}]);
            }
            presets = [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            esmodules: true
                        },
                        modules: "commonjs"
                    }
                ],
                [
                    "@babel/preset-react",
                    {
                        runtime: "automatic",
                        development: isDevelopment
                    }
                ]
            ];
            break;
        }

        case "client.esm.webpack": {
            if (isDevelopment) {
                // NOTE-RT: see the identical note in the "client"/"client.es5" case above.
                plugins.push(["react-refresh/babel", {skipEnvCheck: true}]);
            }
            presets = [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            esmodules: true
                        },
                        // NOTE-RT: unlike every other case, `modules` stays `false` here so Babel
                        // preserves real ES module `import`/`export` syntax instead of transpiling
                        // to CommonJS. This is the standard, documented way to pair webpack + Babel +
                        // `react-refresh-webpack-plugin` (only active when `isDevelopment`): the
                        // plugin injects its own real-ESM preamble into every module it instruments,
                        // and webpack wraps ESM-syntax modules with its own Harmony-style
                        // `__webpack_exports__` parameter - if Babel had already transpiled the rest
                        // of the module body to CommonJS's bare `exports` identifier instead, the two
                        // conventions mismatch and crash at runtime with
                        // `ReferenceError: exports is not defined in ES module scope`. This is a
                        // dedicated env name (NOT reused from `client.esm` above) specifically because
                        // `client.esm` is also used for every package's own `build:babel:esm` library
                        // transpile step, which needs `modules: "commonjs"` instead (see the note
                        // above) - only `packages/www`'s own webpack dev-server ESM bundle
                        // (`webpack.client.config.esm.js`) sets `babelEnv: "client.esm.webpack"`.
                        modules: false
                    }
                ],
                [
                    "@babel/preset-react",
                    {
                        runtime: "automatic",
                        development: isDevelopment
                    }
                ]
            ];
            break;
        }

        case "development":
        default: {
            break;
        }
    }

    return {
        plugins,
        presets
    };
};
