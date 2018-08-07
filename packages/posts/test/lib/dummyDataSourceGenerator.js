import DataSource from "../../lib/dataSource";

export default ({
                    stubIsEnabled = () => true,

                    stubBeforePostsGetter,
                    stubPostsGetter,
                    stubAfterPostsGetter,

                    stubBeforePostGetter,
                    stubPostGetter,
                    stubAfterPostGetter,

                    stubJsonToPost
                }) => {

    return class DummyDataSource extends DataSource {
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

        async beforePostGetter(postId, params) {
            return stubBeforePostGetter(postId, params);
        }

        async postGetter(postId, params) {
            return stubPostGetter(postId, params);
        }

        async afterPostGetter(post, params) {
            return stubAfterPostGetter(post, params);
        }

        jsonToPost(postJson) {
            return stubJsonToPost(postJson);
        }
    };
};
