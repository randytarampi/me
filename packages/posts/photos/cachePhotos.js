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
        });
};

export default cachePhotos;
