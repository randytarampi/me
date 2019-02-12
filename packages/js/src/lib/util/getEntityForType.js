import {Gallery} from "../gallery";
import {LinkPost} from "../linkPost";
import {Photo} from "../photo";
import {Post} from "../post";

export const POST_ENTITIES = [Post, Photo, Gallery, LinkPost];
export const POST_ENTITIES_MAP = POST_ENTITIES.reduce((entitiesMap, entity) => {
    entitiesMap[entity.type] = entity;
    return entitiesMap;
}, {});
export const POST_TYPES = POST_ENTITIES.map(entity => entity.type);

export const getEntityForType = type => {
    const entity = POST_ENTITIES_MAP[type];

    if (!entity) {
        throw new Error(`Can't \`getEntityForType\` for \`${type}\``);
    }

    return entity;
};

export default getEntityForType;
