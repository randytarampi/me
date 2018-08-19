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
    logger.debug(`[Post.createPost] persisted post (${JSON.stringify(postModelInstance && postModelInstance.uid)})`);
    return postModelInstanceToEntity(postModelInstance);
};

/**
 * Retrieve a single [Post]{@link Post} matching a [Post.uid]{@link Post.uid} or some other attributes
 * @param params {Object} A Dynamoose parseable query object
 * @param options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<Post>}
 */
export const getPost = async ({options, ...params}) => {
    logger.debug(`[Post.getPost] retrieving post (${JSON.stringify(params)}) with ${JSON.stringify(options)}`);
    const postModelInstance = await Post.queryOne(params, options).exec();
    logger.debug(`[Post.getPost] retrieved post (${postModelInstance && postModelInstance.uid})`);
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
 * Retrieve an array of [Posts]{@link Post} matching a [Post.uid]{@link Post.uid} or some other attributes
 * @param params {Object} A Dynamoose parseable query object
 * @param options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<Post[]>}
 */
export const getPosts = async ({options, ...params}) => {
    logger.debug(`[Post.getPosts] retrieving posts (${JSON.stringify(params)}) ${JSON.stringify(options)}`);
    let postModelInstances = await Post.query(params, options).all().exec();
    logger.debug(`[Post.getPosts] retrieved posts (${JSON.stringify(postModelInstances.map(postModelInstance => postModelInstance.uid))})`);
    return postModelInstances.map(postModelInstanceToEntity);
};

export default Post;
