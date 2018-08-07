export default ({
                    stubGetPosts,
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
