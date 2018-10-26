const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const config = require("config");
const {isDevelopment} = require("./util");

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
            }
        ]
    }
];

module.exports = (api) => {
    let presets = [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current"
                },
                useBuiltIns: "entry",
                shippedProposals: true
            }
        ],
        [
            "@babel/preset-react",
            {
                development: isDevelopment
            }
        ]
    ];

    let plugins = [
        "lodash",
        configuredMinifyReplace,
        ["@babel/plugin-proposal-class-properties", {loose: true}],
        ["@babel/plugin-transform-classes", {loose: true}],
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-proto-to-assign",
        "@babel/plugin-transform-member-expression-literals",
        "@babel/plugin-transform-property-literals",
        "@babel/plugin-transform-reserved-words"
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
                        useBuiltIns: "entry",
                        shippedProposals: true
                    }
                ],
                [
                    "@babel/preset-react",
                    {
                        development: isDevelopment
                    }
                ]
            ];
            break;
        }

        case "client": {
            if (isDevelopment) {
                plugins.push("react-hot-loader/babel");
            }
            presets = [
                [
                    "@babel/preset-env",
                    {
                        forceAllTransforms: true,
                        useBuiltIns: "entry",
                        shippedProposals: true
                    }
                ],
                [
                    "@babel/preset-react",
                    {
                        development: isDevelopment
                    }
                ]
            ];
            break;
        }

        case "publish": {
            presets = [
                [
                    "@babel/preset-env",
                    {
                        forceAllTransforms: true,
                        useBuiltIns: "entry",
                        shippedProposals: true
                    }
                ],
                [
                    "@babel/preset-react",
                    {
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
