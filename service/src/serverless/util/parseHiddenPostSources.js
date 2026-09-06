const sourceNamePattern = /^[a-z][a-z0-9-]*$/;

/** Parse the comma-separated source exclusion setting passed to public Lambdas. */
const parseHiddenPostSources = (value = process.env.HIDDEN_POST_SOURCES || "") => {
    if (typeof value !== "string") {
        throw new TypeError("HIDDEN_POST_SOURCES must be a comma-separated string");
    }

    if (!value.trim()) {
        return [];
    }

    const sources = value.split(",").map(source => source.trim());

    if (sources.some(source => !sourceNamePattern.test(source))) {
        throw new Error("HIDDEN_POST_SOURCES contains an invalid source name");
    }

    return [...new Set(sources)];
};

export default parseHiddenPostSources;
export {parseHiddenPostSources};
