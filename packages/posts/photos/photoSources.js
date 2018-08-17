import instagram from "./instagram/photoSource";

export const photoSources = [
    // flickr,
    // unsplash,
    instagram,
    // tumblr,
    // local,
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

