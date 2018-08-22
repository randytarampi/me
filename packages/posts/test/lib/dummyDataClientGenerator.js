export const DummyDataClientGenerator = ({
                                             stubGetPosts,
                                             stubGetPostCount,
                                             stubCreatePosts,

                                             stubGetPost,
                                             stubCreatePost
                                         }) => {
    return class DummyDataClient {
        constructor(type) {
            this.type = type;
        }

        async getPosts(params) {
            return stubGetPosts(params);
        }

        async getPostCount(params) {
            return stubGetPostCount(params);
        }

        async createPosts(posts) {
            return stubCreatePosts(posts);
        }

        async getPost(params) {
            return stubGetPost(params);
        }

        async createPost(post) {
            return stubCreatePost(post);
        }
    };
};

export default DummyDataClientGenerator;
