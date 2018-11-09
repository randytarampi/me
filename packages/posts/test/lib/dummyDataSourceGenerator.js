import DataSource from "../../src/lib/dataSource";

export const DummyDataSourceGenerator = ({
                                             stubIsEnabled = () => true,

                                             stubBeforePostsGetter,
                                             stubPostsGetter,
                                             stubAfterPostsGetter,
                                             stubAllPostsGetter,

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

        jsonToPost(postJson) {
            return stubJsonToPost(postJson);
        }
    };
};

export default DummyDataSourceGenerator;
