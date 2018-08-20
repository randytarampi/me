import CachedDataSource from "../lib/cachedDataSource";

/**
 * A [Photo]{@link Photo} specific data source that fetches from some service or some cache, whichever returns first
 * @abstract
 */
class PhotoSource extends CachedDataSource {
}

export default PhotoSource;
