module.exports.default = () => {
    const path = require("path");
    process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../../../../config");
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
