const sources = require("./index.js");
const logger = require("../../serverless/logger.js");

const cachePosts = (searchParams, postSources) => {
    return sources.initializeSources(postSources)
        .then(initializedSources => Promise.all(initializedSources.map(postSource => {
            return postSource.getAllServiceRecords(searchParams)
                .catch(error => {
                    logger.error(error);
                    return [];
                });
        })));
};

module.exports = cachePosts;
module.exports.cachePosts = cachePosts;
module.exports.default = module.exports;
