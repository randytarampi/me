import _ from "lodash";
import {initializePhotoSources} from "./photoSources";

const searchPhotos = photoSearchParams => {
    return initializePhotoSources()
        .then(photoSources => {
            return Promise.all(
                photoSources.map((photoSource) => {
                    return photoSource.getUserPhotos(photoSearchParams)
                        .catch((error) => {
                            console.error(error); // eslint-disable-line no-console
                            return [];
                        });
                })
            );
        })
        .then(_.flatten)
        .then(flattenedPhotos => {
            return _.sortBy(flattenedPhotos, [
                post => -1 * (post.dateCreated ? post.dateCreated.valueOf() : post.datePublished.valueOf())
            ]);
        });
};

export default searchPhotos;
