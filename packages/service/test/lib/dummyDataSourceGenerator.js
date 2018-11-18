import DataSource from "../../src/lib/dataSource";

export const DummyDataSourceGenerator = ({
                                             stubType,

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
    };
};

export default DummyDataSourceGenerator;
