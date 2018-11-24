import dynamoose from "dynamoose";
import logger from "../../lib/logger";
import PostSchema from "../schema/post";

const Post = dynamoose.model(process.env.POSTS_DYNAMODB_TABLE, PostSchema);

/**
 * Persist a [Post]{@link Post}
 * @param post {Post}
 * @returns {Promise<Post>}
 */
export const createPost = async post => {
    logger.trace(`persisting post (${post.uid})`);
    const postModelInstance = await Post.create(post.toJS(), {overwrite: true});
    logger.trace(`persisted post (${JSON.stringify(postModelInstance && postModelInstance.uid)})`);
    return postModelInstance;
};

/**
 * Retrieve a single [Post]{@link Post} matching a [Post.uid]{@link Post.uid} or some other attributes
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<Post>}
 */
export const getPost = async ({_options, _filter, _query}) => {
    logger.trace(`retrieving post (${_query ? JSON.stringify(_query) : JSON.stringify(_filter)}) with ${JSON.stringify(_options)}`);
    const postModelInstance = _query
        ? await Post.queryOne(_query, _options).exec()
        : await Post.scan(_filter, _options).limit(1000).all().exec()
            .then(instanceContainer => instanceContainer[0]);
    logger.trace(`retrieved post (${postModelInstance && postModelInstance.uid})`);
    return postModelInstance;
};

/**
 * Persist an array of [Posts]{@link Post}
 * @param posts {Post[]}
 * @returns {Promise<Post[]>}
 */
export const createPosts = async posts => {
    logger.trace(`persisting posts (${JSON.stringify(posts.map(post => post.uid))})`);
    await Post.batchPut(posts.map(post => post.toJS()), {overwrite: true});
    const postModelInstances = await Post.scan({uid: {in: posts.map(post => post.uid)}}).limit(1000).all().exec(); // NOTE-RT: Ugh. This is gross af. According to the docs, `batchPut`should return some Dynamoose model instances, but if you look at their tests and source they just return a statement of success and what wasn't processed
    logger.trace(`persisted posts (${JSON.stringify(postModelInstances.map(postModelInstance => postModelInstance.uid))})`);
    return postModelInstances;
};

/**
 * Retrieve an array of [Posts]{@link Post} matching a [Post.uid]{@link Post.uid} or some other attributes
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<Post[]>}
 */
export const getPosts = async ({_options, _filter, _query}) => {
    logger.trace(`retrieving posts (${_query ? JSON.stringify(_query) : JSON.stringify(_filter)}) ${JSON.stringify(_options)}`);
    const {limit: originalLimit} = _options || {};
    let postModelInstances = _query
        ? await Post.query(_query, _options).exec()
        : await Post.scan(_filter, _options).limit(1000).all().exec()
            .then(allPosts => originalLimit ? allPosts.slice(0, originalLimit) : allPosts);
    logger.trace(`retrieved posts (${JSON.stringify(postModelInstances.map(postModelInstance => postModelInstance.uid))})`);
    return postModelInstances;
};

/**
 * Retrieve a count of _all_ [Posts]{@link Post} matching a [Post.uid]{@link Post.uid} or some other attributes
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<Post[]>}
 */
export const getPostCount = async ({_options, _filter, _query}) => {
    logger.trace(`counting posts (${_query ? JSON.stringify(_query) : JSON.stringify(_filter)}) ${JSON.stringify(_options)}`);
    let postModelInstanceCount = _query
        ? await Post.query(_query, _options).limit(1000).all().count().exec()
        : await Post.scan(_filter, _options).limit(1000).all().count().exec()
            .then(countContainer => countContainer[0]);
    logger.trace(`counted (${postModelInstanceCount}) posts`);
    return postModelInstanceCount;
};

export default Post;
