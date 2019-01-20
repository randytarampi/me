import dynamoose from "dynamoose";
import logger from "../../lib/logger";
import AuthInfoSchema from "../schema/authInfo";
import {buildQueryWithFilter, recursivelyGet} from "../util";

export const getModel = (modelName = process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE) => dynamoose.model(modelName, AuthInfoSchema, {
    create: false
});

const AuthInfo = getModel();

/**
 * Persist a [AuthInfo]{@link AuthInfo}
 * @param authInfo {AuthInfo}
 * @returns {Promise<AuthInfo>}
 */
export const createRecord = async authInfo => {
    logger.trace(`persisting authInfo (${authInfo.uid})`);
    const authInfoModelInstance = await AuthInfo.create(authInfo.toJS(), {overwrite: true});
    logger.trace(`persisted authInfo (${JSON.stringify(authInfoModelInstance && authInfoModelInstance.uid)})`);
    return authInfoModelInstance;
};

/**
 * Retrieve a single [AuthInfo]{@link AuthInfo} matching a [AuthInfo.uid]{@link AuthInfo.uid} or some other attributes
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<AuthInfo>}
 */
export const getRecord = async ({_options, _filter, _query}) => {
    logger.trace(`retrieving authInfo (_query: ${JSON.stringify(_query)}, _filter: ${JSON.stringify(_filter)}) with ${JSON.stringify(_options)}`);
    const authInfoModelInstance = _query
        ? await buildQueryWithFilter({_options, _filter, _query}, AuthInfo.queryOne).exec()
        : await AuthInfo.scan(_filter, _options).limit(1000).all().exec()
            .then(instanceContainer => instanceContainer[0]);
    logger.trace(`retrieved authInfo (${authInfoModelInstance && authInfoModelInstance.uid})`);
    return authInfoModelInstance;
};

/**
 * Persist an array of [AuthInfos]{@link AuthInfo}
 * @param authInfos {AuthInfo[]}
 * @returns {Promise<AuthInfo[]>}
 */
export const createRecords = async authInfos => {
    logger.trace(`persisting authInfos (${JSON.stringify(authInfos.map(authInfo => authInfo.uid))})`);
    await AuthInfo.batchPut(authInfos.map(authInfo => authInfo.toJS()), {overwrite: true});
    logger.trace(`persisted authInfos (${JSON.stringify(authInfos.map(authInfo => authInfo.uid))})`);
    return authInfos;
};

/**
 * Retrieve an array of [AuthInfos]{@link AuthInfo} matching a [AuthInfo.uid]{@link AuthInfo.uid} or some other attributes
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<AuthInfo[]>}
 */
export const getRecords = async ({_options, _filter, _query}) => {
    logger.trace(`retrieving authInfos (_query: ${JSON.stringify(_query)}, _filter: ${JSON.stringify(_filter)}) ${JSON.stringify(_options)}`);
    const {limit: originalLimit} = _options || {};
    let authInfoModelInstances = _query
        ? await buildQueryWithFilter({_options, _filter, _query}, AuthInfo.query).exec()
            .then(recursivelyGet({_options, _filter, _query}, getRecords))
            .then(allAuthInfos => originalLimit ? allAuthInfos.slice(0, originalLimit) : allAuthInfos)
        : await AuthInfo.scan(_filter, _options).exec()
            .then(recursivelyGet({_options, _filter, _query}, getRecords))
            .then(allAuthInfos => originalLimit ? allAuthInfos.slice(0, originalLimit) : allAuthInfos);
    logger.trace(`retrieved authInfos (${JSON.stringify(authInfoModelInstances.map(authInfoModelInstance => authInfoModelInstance.uid))})`);
    return authInfoModelInstances;
};

/**
 * Retrieve a count of _all_ [AuthInfos]{@link AuthInfo} matching a [AuthInfo.uid]{@link AuthInfo.uid} or some other attributes
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @returns {Promise<AuthInfo[]>}
 */
export const getRecordCount = async ({_options, _filter, _query}) => {
    logger.trace(`counting authInfos (_query: ${JSON.stringify(_query)}, _filter: ${JSON.stringify(_filter)}) ${JSON.stringify(_options)}`);
    let authInfoModelInstanceCount = _query
        ? await buildQueryWithFilter({_options, _filter, _query}, AuthInfo.query).limit(1000).all().count().exec()
        : await AuthInfo.scan(_filter, _options).limit(1000).all().count().exec()
            .then(countContainer => countContainer[0]);
    logger.trace(`counted (${authInfoModelInstanceCount}) authInfos`);
    return authInfoModelInstanceCount;
};

export default AuthInfo;
