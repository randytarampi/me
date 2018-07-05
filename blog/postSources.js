import photos from "./photos/postSource";
import words from "./words/postSource";

export const postSources = [
    photos,
    words,
];

export const initializePostSources = () => Promise.resolve(postSources)
    .map(clientConstructor => {
        return new clientConstructor();
    })
    .filter(client => {
        return client.isEnabled;
    })
    .map(client => {
        return client.initializing;
    });

export const initializedClients = initializePostSources();

export default initializedClients;

