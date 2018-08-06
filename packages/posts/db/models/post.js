import dynamoose from "dynamoose";
import PostSchema from "../schema/post";

const Post = dynamoose.model(process.env.POSTS_DYNAMODB_TABLE, PostSchema);

const postModelInstanceToEntity = postModelInstance => postModelInstance.toEntity();

/**
 * Persist a [Post]{@link Post}
 * @param post {Post}
 * @returns {Promise<Post>}
 */
export const createPost = async post => {
    const postModelInstance = await Post.create(post);
    return postModelInstanceToEntity(postModelInstance);
};

/**
 * Retrieve a single [Post]{@link Post} matching a [Post.uid]{@link Post.uid} or some combination of other attributes
 * @param postUidOrParams {String|Object[]}
 * @returns {Promise<Post>}
 */
export const getPost = async postUidOrParams => {
    const postModelInstance = await Post.get(postUidOrParams);
    return postModelInstanceToEntity(postModelInstance);
};

/**
 * Persist an array of [Posts]{@link Post}
 * @param posts {Post[]}
 * @returns {Promise<Post[]>}
 */
export const createPosts = async posts => {
    await Post.batchPut(posts);
    const postModelInstances = await Post.batchGet(posts.map(post => post.uid)); // NOTE-RT: Ugh. This is gross af. According to the docs, `batchPut`should return some Dynamoose model instances, but if you look at their tests and source they just return a statement of success and what wasn't processed
    return postModelInstances.map(postModelInstanceToEntity);
};

/**
 * Retrieve an array of [Posts]{@link Post} matching a [Post.uid]{@link Post.uid} or some combination of other attributes
 * @param postUidsOrParams {String[]|Object[]}
 * @returns {Promise<Post[]>}
 */
export const getPosts = async postUidsOrParams => {
    const postModelInstances = await Post.batchGet(postUidsOrParams);
    return postModelInstances.map(postModelInstanceToEntity);
};

export default Post;
