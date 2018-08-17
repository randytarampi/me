import flickr from "./flickr/photoSource";
import instagram from "./instagram/photoSource";
import local from "./local/photoSource";
import tumblr from "./tumblr/photoSource";
import unsplash from "./unsplash/photoSource";

export const photoSources = [
    flickr,
    unsplash,
    instagram,
    tumblr,
    local,
];

export const initializePhotoSources = () => Promise.all(
    photoSources
        .map(photoSourceConstructor => {
            return new photoSourceConstructor();
        })
        .filter(photoSource => {
            return photoSource.isEnabled;
        })
        .map(photoSource => {
            return photoSource.initializing;
        })
);

export const initializedPhotoSources = initializePhotoSources();

export default initializedPhotoSources;

