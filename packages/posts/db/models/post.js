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
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<Post>}
 */
export const getPost = async ({_options, _filter, _query}) => {
    logger.debug(`[Post.getPost] retrieving post (${_query ? JSON.stringify(_query) : JSON.stringify(_filter)}) with ${JSON.stringify(_options)}`);
    const postModelInstance = _query
        ? await Post.queryOne(_query, _options).exec()
        : await Post.scan(_filter, _options).limit(1).exec();
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
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<Post[]>}
 */
export const getPosts = async ({_options, _filter, _query}) => {
    logger.debug(`[Post.getPosts] retrieving posts (${_query ? JSON.stringify(_query) : JSON.stringify(_filter)}) ${JSON.stringify(_options)}`);
    let postModelInstances = _query
        ? await Post.query(_query, _options).exec()
        : await Post.scan(_filter, _options).exec();
    logger.debug(`[Post.getPosts] retrieved posts (${JSON.stringify(postModelInstances.map(postModelInstance => postModelInstance.uid))})`);
    return postModelInstances.map(postModelInstanceToEntity);
};

/**
 * Retrieve a count of _all_ [Posts]{@link Post} matching a [Post.uid]{@link Post.uid} or some other attributes
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<Post[]>}
 */
export const getPostCount = async ({_options, _filter, _query}) => {
    logger.debug(`[Post.getPostCount] counting posts (${_query ? JSON.stringify(_query) : JSON.stringify(_filter)}) ${JSON.stringify(_options)}`);
    let postModelInstanceCount = _query
        ? await Post.query(_query, _options).limit(1000).all().count().exec()
        : await Post.scan(_filter, _options).limit(1000).all().count().exec();
    logger.debug(`[Post.getPostCount] counted (${postModelInstanceCount}) posts`);
    return postModelInstanceCount;
};

export default Post;
