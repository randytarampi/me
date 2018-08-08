import dynamoose from "dynamoose";
import logger from "../../lib/logger";
import PostSchema from "../schema/post";

const Post = dynamoose.model(process.env.POSTS_DYNAMODB_TABLE, PostSchema);

const postModelInstanceToEntity = postModelInstance => postModelInstance && postModelInstance.toEntity();

/**
 * Persist a [Post]{@link Post}
 * @param post {Post}
 * @returns {Promise<Post>}
 */
export const createPost = async post => {
    logger.debug(`[Post.createPost] persisting post (${post.uid})`);
    const postModelInstance = await Post.create(post, {overwrite: true});
    logger.debug(`[Post.createPost] persisted post (${JSON.stringify(postModelInstance.uid)})`);
    return postModelInstanceToEntity(postModelInstance);
};

/**
 * Retrieve a single [Post]{@link Post} matching a [Post.uid]{@link Post.uid} or some combination of other attributes
 * @param postUidOrParams {String|Object[]}
 * @returns {Promise<Post>}
 */
export const getPost = async postUidOrParams => {
    logger.debug(`[Post.getPost] retrieving post (${JSON.stringify(postUidOrParams)})`);
    const queryParams = typeof postUidOrParams === "string"
        ? {uid: {eq: postUidOrParams}}
        : postUidOrParams;
    const postModelInstance = await Post.queryOne(queryParams).exec();
    logger.debug(`[Post.getPost] retrieved post (${postModelInstance.uid})`);
    return postModelInstanceToEntity(postModelInstance);
};

/**
 * Persist an array of [Posts]{@link Post}
 * @param posts {Post[]}
 * @returns {Promise<Post[]>}
 */
export const createPosts = async posts => {
    logger.debug(`[Post.createPosts] persisting posts (${JSON.stringify(posts.map(post => post.uid))})`);
    await Post.batchPut(posts, {overwrite: true});
    const postModelInstances = await Post.batchGet(posts.map(post => post.uid)); // NOTE-RT: Ugh. This is gross af. According to the docs, `batchPut`should return some Dynamoose model instances, but if you look at their tests and source they just return a statement of success and what wasn't processed
    logger.debug(`[Post.createPosts] persisted posts (${JSON.stringify(postModelInstances.map(postModelInstance => postModelInstance.uid))})`);
    return postModelInstances.map(postModelInstanceToEntity);
};

/**
 * Retrieve an array of [Posts]{@link Post} matching a [Post.uid]{@link Post.uid} or some combination of other attributes
 * @param postUidsOrParams {Object}
 * @returns {Promise<Post[]>}
 */
export const getPosts = async postUidsOrParams => {
    logger.debug(`[Post.getPosts] retrieving posts (${JSON.stringify(postUidsOrParams)})`);
    let postModelInstances;

    if (postUidsOrParams instanceof Array) {
        postModelInstances = await Post.batchGet(postUidsOrParams.map(postUid => {
            return {uid: postUid};
        }));
    } else {
        postModelInstances = await Post.query(postUidsOrParams).all().exec();
    }

    logger.debug(`[Post.getPosts] retrieved posts (${JSON.stringify(postModelInstances.map(postModelInstance => postModelInstance.uid))})`);
    return postModelInstances.map(postModelInstanceToEntity);
};

export default Post;
