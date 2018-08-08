import DummyCacheClientGenerator from "./dummyCacheClientGenerator";
import DummyCachedDataSourceGenerator from "./dummyCachedDataSourceGenerator";
import DummyDataClientGenerator from "./dummyDataClientGenerator";

export const dummyClassesGenerator = ({
                                          stubBeforePostsGetter,
                                          stubPostsGetter,
                                          stubAfterPostsGetter,

                                          stubBeforePostGetter,
                                          stubPostGetter,
                                          stubAfterPostGetter,

                                          stubBeforeCachedPostsGetter,
                                          stubCachedPostsGetter,
                                          stubAfterCachedPostsGetter,

                                          stubBeforeCachedPostGetter,
                                          stubCachedPostGetter,
                                          stubAfterCachedPostGetter,

                                          stubJsonToPost,

                                          stubGetPosts,
                                          stubCreatePosts,

                                          stubGetPost,
                                          stubCreatePost
                                      }) => {
    return {
        DummyCachedDataSource: DummyCachedDataSourceGenerator({
            stubBeforePostsGetter,
            stubPostsGetter,
            stubAfterPostsGetter,

            stubBeforePostGetter,
            stubPostGetter,
            stubAfterPostGetter,

            stubBeforeCachedPostsGetter,
            stubCachedPostsGetter,
            stubAfterCachedPostsGetter,

            stubBeforeCachedPostGetter,
            stubCachedPostGetter,
            stubAfterCachedPostGetter,

            stubJsonToPost
        }),
        DummyDataClient: DummyDataClientGenerator({
            stubGetPosts,
            stubCreatePosts,

            stubGetPost,
            stubCreatePost
        }),
        DummyCacheClient: DummyCacheClientGenerator({
            dummyDataClientStubs: {
                stubGetPosts,
                stubCreatePosts,

                stubGetPost,
                stubCreatePost
            }
        })
    };
};

export default dummyClassesGenerator;
