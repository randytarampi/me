import {createRequire} from "module";
import {join} from "path";
import util from "./util.js";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
const __filename = import.meta.filename;
process.env.NODE_CONFIG_DIR = join(__dirname, "config");
// NOTE-RT: library build scripts (build/build:babel:es5/build:babel:esm/build:gulp) deliberately no
// longer hardcode NODE_ENV/NODE_CONFIG_ENV themselves, so a package can be built standalone (or as
// part of a caller that already sets its own real NODE_ENV, e.g. `test`/`dev`/`printable`) without
// this file clobbering that intent. `config` itself already falls back to NODE_ENV when
// NODE_CONFIG_ENV is unset - this mirrors that exact chain, only replacing config's own ultimate
// "development" default (which doesn't match any file in `config/` - there's no development.yml)
// with "prd", so a truly bare invocation (nothing set at all) still resolves a real, safe config
// flavour instead of warning and silently falling back to `default.cjs`/`local.cjs` only.
process.env.NODE_CONFIG_ENV = process.env.NODE_CONFIG_ENV || process.env.NODE_ENV || "prd";

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

// NOTE-RT: only used by the "client.esm" case's genuine-ESM library build output. Node's own core
// ESM loader (unlike webpack/Mocha's own tolerant resolution) refuses unrecognized extensions
// (`.jsx`) and requires "fully specified" bare subpath imports for CommonJS dependencies -
// `babel-plugin-lodash` (the "lodash" plugin above) rewrites `import {x} from "lodash"` into
// `import x from "lodash/x"`, which resolves fine under Node's CJS algorithm but isn't "fully
// specified" for ESM. This plugin rewrites both cases to real, `require()`/`import()`-loadable
// specifiers (`./Foo.jsx` -> `./Foo.js`, `lodash/x` -> `lodash/x.js`), matching this same env's
// `build:babel:esm` script (which also drops `--keep-file-extension`, so `.jsx` source files are
// physically renamed to `.js` in the emitted output - keeping filenames and specifiers in sync).
// It must be listed after "lodash" in the `plugins` array below so it also sees (and fixes up) the
// bare `lodash/x` imports "lodash" itself inserts, not just the ones already in source.
const rewriteEsmSpecifierExtensions = ({types: t}) => {
    const rewriteSource = (sourceNode) => {
        if (!sourceNode || !t.isStringLiteral(sourceNode)) {
            return;
        }

        if (sourceNode.value.endsWith(".jsx")) {
            sourceNode.value = `${sourceNode.value.slice(0, -4)}.js`;
        } else if (/^lodash\/[^./]+$/.test(sourceNode.value)) {
            sourceNode.value = `${sourceNode.value}.js`;
        }
    };

    return {
        name: "rewrite-esm-specifier-extensions",
        visitor: {
            "ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration"(path) {
                rewriteSource(path.node.source);
            },
            CallExpression(path) {
                if (t.isImport(path.node.callee) && path.node.arguments.length === 1) {
                    rewriteSource(path.node.arguments[0]);
                }
            }
        }
    };
};

// NOTE-RT: only used by the "client.esm" case's genuine-ESM library build output (gated behind
// `BABEL_ESM_STANDALONE_BUILD`, same as `rewriteEsmSpecifierExtensions` above). A couple of source
// files (e.g. `packages/resume/src/lib/containers/resume.jsx`, `packages/letter/src/lib/
// components/letter/index.jsx`) use a bare `require(...)` to optionally/dynamically load
// gitignored, user-supplied local content - this works unmodified in webpack bundles (where a bare
// `require` is webpack's own always-available native primitive, regardless of ESM/CJS output) and
// used to work in this same standalone build back when it still compiled to CommonJS (Node
// provides a real ambient `require` in any CJS module). Now that this build's output is genuine
// ESM, there's no ambient `require` unless one is explicitly created - this plugin detects any
// bare, unbound `require(...)` call in a file and injects a real `createRequire`-backed local
// `require` binding for it, so those call sites keep working completely unchanged.
const injectRequireShimForStandaloneEsm = ({types: t}) => {
    return {
        name: "inject-require-shim-for-standalone-esm",
        visitor: {
            Program: {
                exit(path) {
                    let usesBareRequire = false;

                    path.traverse({
                        CallExpression(innerPath) {
                            if (
                                t.isIdentifier(innerPath.node.callee, {name: "require"}) &&
                                !innerPath.scope.getBinding("require")
                            ) {
                                usesBareRequire = true;
                            }
                        }
                    });

                    if (!usesBareRequire) {
                        return;
                    }

                    path.unshiftContainer("body", t.variableDeclaration("const", [
                        t.variableDeclarator(
                            t.identifier("require"),
                            t.callExpression(t.identifier("createRequire"), [
                                t.memberExpression(
                                    t.metaProperty(t.identifier("import"), t.identifier("meta")),
                                    t.identifier("url")
                                )
                            ])
                        )
                    ]));
                    path.unshiftContainer("body", t.importDeclaration(
                        [t.importSpecifier(t.identifier("createRequire"), t.identifier("createRequire"))],
                        t.stringLiteral("module")
                    ));
                }
            }
        }
    };
};

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

        // NOTE-RT: `client.esm` is used for both (1) every package's own `build:babel:esm` script,
        // which Babel-transpiles `src` into a standalone, genuinely-ESM `esm/` output directory
        // (real `import`/`export` syntax, no CJS stamp), and (2) `packages/www`'s own
        // `webpack.client.config.esm.js` dev-server bundle, which also needs real ESM
        // (`modules: false`) for `react-refresh-webpack-plugin` interop - webpack wraps ESM-syntax
        // modules with its own Harmony-style `__webpack_exports__` parameter, and mismatching that
        // with Babel-compiled CommonJS crashes at runtime with
        // `ReferenceError: exports is not defined in ES module scope`. Since both purposes now need
        // the same `modules: false` setting, they share this single case (previously split into
        // "client.esm" + "client.esm.webpack" back when the library build still needed CommonJS).
        case "client.esm": {
            if (isDevelopment) {
                // NOTE-RT: `react-refresh/babel` has its own internal guard that independently
                // requires Babel's own env name (`api.env()`) to literally be "development", but this
                // repo's custom env-name scheme (`client.esm`, ...) never uses that literal value for
                // real dev-server invocations. `isDevelopment` above is already the authoritative,
                // fail-safe (opt-in on `NODE_ENV`/`BABEL_ENV` === "development") gate for this plugin,
                // so it's safe to skip the plugin's own redundant internal check.
                plugins.push(["react-refresh/babel", {skipEnvCheck: true}]);
            }
            if (process.env.BABEL_ESM_STANDALONE_BUILD === "true") {
                // NOTE-RT: only set by each package's own `build:babel:esm` script (never by
                // `packages/www`'s webpack dev-server bundle, which also uses this same env name -
                // see the case comment above). Rewriting specifiers this way only makes sense for a
                // standalone `esm/` output directory meant to be `require()`/`import()`-loaded
                // directly by Node; webpack's own resolver would need a matching
                // `resolve.extensionAlias` to follow a rewritten `.js` specifier back to an actual
                // `.jsx` source file, which the `www` bundle doesn't (and shouldn't need to) set up.
                plugins.push(rewriteEsmSpecifierExtensions);
                plugins.push(injectRequireShimForStandaloneEsm);
            }
            presets = [
                [
                    "@babel/preset-env",
                    {
                        targets: {
                            esmodules: true
                        },
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
