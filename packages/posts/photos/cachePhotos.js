import _ from "lodash";
import logger from "../lib/logger";
import {initializePhotoSources} from "./photoSources";

const cachePhotos = photoSearchParams => {
    return initializePhotoSources()
        .then(photoSources => {
            return Promise.all(
                photoSources.map((photoSource) => {
                    return photoSource.getServicePosts(photoSearchParams)
                        .catch((error) => {
                            logger.error(error);
                            return [];
                        });
                })
            );
        })
        .then(_.flatten)
        .then(flattenedPhotos => {
            return _.sortBy(flattenedPhotos, [
                post => -1 * (post.dateCreated ? post.dateCreated.valueOf() : post.datePublished ? post.datePublished.valueOf() : 0)
            ]);
        });
};

export default cachePhotos;
