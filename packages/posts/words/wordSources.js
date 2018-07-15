import s3 from "./s3/wordSource";
import tumblr from "./tumblr/wordSource";

export const wordSources = [
    s3,
    tumblr,
];

export const initializeWordSources = () => Promise.all(
    wordSources
        .map(wordSourceConstructor => {
            return new wordSourceConstructor();
        })
        .filter(wordSource => {
            return wordSource.isEnabled;
        })
        .map(wordSource => {
            return wordSource.initializing;
        })
);

export const initializedWordSources = initializeWordSources();

export default initializedWordSources;

