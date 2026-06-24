module.exports.default = () => {
    const path = require("path");
    const fs = require("fs");
    const packageConfigDir = path.join(process.cwd(), "config");
    const rootConfigDir = path.join(process.cwd(), "../../config");

    process.env.NODE_CONFIG_DIR = fs.existsSync(packageConfigDir)
        ? packageConfigDir
        : rootConfigDir;
    const config = require("config");

    return {
        posts: config.get("posts"),
        logger: {
            enabled: config.has("logger").toString(),
            streams: Object.keys(config.get("logger.streams")).reduce((streams, key) => {
                streams[key] = config.get(`logger.streams.${key}`).toString();
                return streams;
            }, {}),
            level: config.get("logger.level"),
            src: config.get("logger.src").toString()
        },
        www: config.get("www"),
        resume: config.get("resume"),
        letter: config.get("letter"),
        me: config.get("me")
    };
};
