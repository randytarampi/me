import CachedDataSource from "../lib/cachedDataSource";

/**
 * A [Post]{@link Post} specific data source that fetches from some service or some cache, whichever returns first
 * @abstract
 */
class WordSource extends CachedDataSource {
}

export default WordSource;
