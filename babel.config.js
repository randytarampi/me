const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const config = require("config");

const configuredMinifyReplace = [
    "minify-replace",
    {
        replacements: [
            {
                identifierName: "__WORDS_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("wordsServiceUrl")
                }
            },
            {
                identifierName: "__POSTS_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("postsServiceUrl")
                }
            },
            {
                identifierName: "__PHOTOS_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("photosServiceUrl")
                }
            },
            {
                identifierName: "__RESUME_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("resumeServiceUrl")
                }
            },
            {
                identifierName: "__LETTER_SERVICE_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("letterServiceUrl")
                }
            },
            {
                identifierName: "__CODE_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("codeAppUrl")
                }
            },
            {
                identifierName: "__WORDS_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("wordsAppUrl")
                }
            },
            {
                identifierName: "__POSTS_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("postsAppUrl")
                }
            },
            {
                identifierName: "__PHOTOS_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("photosAppUrl")
                }
            },
            {
                identifierName: "__RESUME_APP_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("resumeAppUrl")
                }
            },
            {
                identifierName: "__ASSET_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("assetUrl")
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
                identifierName: "__PUBLISHED_LETTER_URL__",
                replacement: {
                    type: "stringLiteral",
                    value: config.get("letter.publishUrl")
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
                development: api.env() !== "prd"
            }
        ]
    ];

    let plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "react-hot-loader/babel",
        "lodash",
        configuredMinifyReplace
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
                "@babel/preset-react"
            ];
            break;
        }

        case "client": {
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
                        development: api.env() !== "prd"
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
