// @ts-check
import {Gallery} from "../gallery.js";
import {LinkPost} from "../linkPost.js";
import {Photo} from "../photo.js";
import {Post} from "../post.js";

/** @type {Array<Function>} */
export const POST_ENTITIES = [Post, Photo, Gallery, LinkPost];
export const POST_ENTITIES_MAP = POST_ENTITIES.reduce((entitiesMap, entity) => {
    entitiesMap[entity.type] = entity;
    return entitiesMap;
}, {});
export const POST_TYPES = POST_ENTITIES.map(entity => entity.type);

/**
 * Get the record class for a post type.
 * @param {string} type - The post type.
 * @returns {Function} The matching constructor.
 */
export const getEntityForType = type => {
    const entity = POST_ENTITIES_MAP[type];

    if (!entity) {
        throw new Error(`Can't \`getEntityForType\` for \`${type}\``);
    }

    return entity;
};

export default getEntityForType;
