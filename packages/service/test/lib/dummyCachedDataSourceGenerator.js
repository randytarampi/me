import CachedDataSource from "../../src/lib/cachedDataSource";

export const DummyCachedDataSourceGenerator = ({
                                                   stubIsEnabled = () => true,

                                                   stubBeforePostsGetter,
                                                   stubPostsGetter,
                                                   stubAfterPostsGetter,

                                                   stubAllPostsGetter,

                                                   stubBeforePostGetter,
                                                   stubPostGetter,
                                                   stubAfterPostGetter,

                                                   stubBeforeCachedPostsGetter,
                                                   stubCachedPostsGetter,
                                                   stubAfterCachedPostsGetter,

                                                   stubAllCachedPostsGetter,

                                                   stubBeforeCachedPostGetter,
                                                   stubCachedPostGetter,
                                                   stubAfterCachedPostGetter,

                                                   stubJsonToPost
                                               }) => {

    return class DummyCachedDataSource extends CachedDataSource {
        get isEnabled() {
            return stubIsEnabled();
        }

        async beforePostsGetter(params) {
            return stubBeforePostsGetter(params);
        }

        async postsGetter(params) {
            return stubPostsGetter(params);
        }

        async afterPostsGetter(posts, params) {
            return stubAfterPostsGetter(posts, params);
        }

        async allPostsGetter(posts, params) {
            return stubAllPostsGetter(posts, params);
        }

        async beforePostGetter(postId, params) {
            return stubBeforePostGetter(postId, params);
        }

        async postGetter(postId, params) {
            return stubPostGetter(postId, params);
        }

        async afterPostGetter(post, params) {
            return stubAfterPostGetter(post, params);
        }

        async beforeCachedPostsGetter(params) {
            return stubBeforeCachedPostsGetter(params);
        }

        async cachedPostsGetter(params) {
            return stubCachedPostsGetter(params);
        }

        async afterCachedPostsGetter(posts, params) {
            return stubAfterCachedPostsGetter(posts, params);
        }

        async allCachedPostsGetter(posts, params) {
            return stubAllCachedPostsGetter(posts, params);
        }

        async beforeCachedPostGetter(postId, params) {
            return stubBeforeCachedPostGetter(postId, params);
        }

        async cachedPostGetter(postId, params) {
            return stubCachedPostGetter(postId, params);
        }

        async afterCachedPostGetter(post, params) {
            return stubAfterCachedPostGetter(post, params);
        }

        jsonToPost(postJson) {
            return stubJsonToPost(postJson);
        }
    };
};

export default DummyCachedDataSourceGenerator;
