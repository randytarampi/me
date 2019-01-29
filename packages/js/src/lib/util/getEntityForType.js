import {Gallery} from "../gallery";
import {LinkPost} from "../linkPost";
import {Photo} from "../photo";
import {Post} from "../post";

export const POST_ENTITIES = [Gallery, LinkPost, Photo, Post];
export const POST_ENTITIES_MAP = POST_ENTITIES.reduce((entitiesMap, entity) => {
    entitiesMap[entity.type] = entity;
    return entitiesMap;
}, {});

export const getEntityForType = type => {
    const entity = POST_ENTITIES_MAP[type];

    if (!entity) {
        throw new Error(`Can't \`getEntityForType\` for \`${type}\``);
    }

    return entity;
};

export default getEntityForType;
