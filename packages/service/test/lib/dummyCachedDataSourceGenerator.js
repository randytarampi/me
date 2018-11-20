import CachedDataSource from "../../src/lib/cachedDataSource";

export const DummyCachedDataSourceGenerator = ({
                                                   stubType,

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
        static get type() {
            return stubType ? stubType : super.type;
        }

        static jsonToPost(postJson) {
            return stubJsonToPost ? stubJsonToPost(postJson) : super.jsonToPost(postJson);
        }

        async beforePostsGetter(params) {
            return stubBeforePostsGetter ? stubBeforePostsGetter(params) : super.beforePostsGetter(params);
        }

        async postsGetter(params) {
            return stubPostsGetter ? stubPostsGetter(params) : super.postsGetter(params);
        }

        async afterPostsGetter(posts, params) {
            return stubAfterPostsGetter ? stubAfterPostsGetter(posts, params) : super.afterPostsGetter(posts, params);
        }

        async allPostsGetter(posts, params) {
            return stubAllPostsGetter ? stubAllPostsGetter(posts, params) : super.allPostsGetter(posts, params);
        }

        async beforePostGetter(postId, params) {
            return stubBeforePostGetter ? stubBeforePostGetter(postId, params) : super.beforePostGetter(postId, params);
        }

        async postGetter(postId, params) {
            return stubPostGetter ? stubPostGetter(postId, params) : super.postGetter(postId, params);
        }

        async afterPostGetter(post, params) {
            return stubAfterPostGetter ? stubAfterPostGetter(post, params) : super.afterPostGetter(post, params);
        }

        async beforeCachedPostsGetter(params) {
            return stubBeforeCachedPostsGetter ? stubBeforeCachedPostsGetter(params) : super.beforeCachedPostsGetter(params);
        }

        async cachedPostsGetter(params) {
            return stubCachedPostsGetter ? stubCachedPostsGetter(params) : super.cachedPostsGetter(params);
        }

        async afterCachedPostsGetter(posts, params) {
            return stubAfterCachedPostsGetter ? stubAfterCachedPostsGetter(posts, params) : super.afterCachedPostsGetter(posts, params);
        }

        async allCachedPostsGetter(params) {
            return stubAllCachedPostsGetter ? stubAllCachedPostsGetter(params) : super.allCachedPostsGetter(params);
        }

        async beforeCachedPostGetter(postId, params) {
            return stubBeforeCachedPostGetter ? stubBeforeCachedPostGetter(postId, params) : super.beforeCachedPostGetter(postId, params);
        }

        async cachedPostGetter(postId, params) {
            return stubCachedPostGetter ? stubCachedPostGetter(postId, params) : super.cachedPostGetter(postId, params);
        }

        async afterCachedPostGetter(post, params) {
            return stubAfterCachedPostGetter ? stubAfterCachedPostGetter(post, params) : super.afterCachedPostGetter(post, params);
        }
    };
};

export default DummyCachedDataSourceGenerator;
