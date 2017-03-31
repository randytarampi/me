const _ = require("lodash");

const actions = {};

const WORD_SOURCES = [
	require("./s3/wordSource"),
	require("./tumblr/wordSource")
];
const INITIALIZED_WORD_SOURCES = Promise.all(
	_.chain(WORD_SOURCES)
		.map((wordSourceConstructor) => {
			return new wordSourceConstructor();
		})
		.map((wordSource) => {
			return wordSource.initializing;
		})
		.value()
);

actions.getWords = (req, res, next) => {
	return INITIALIZED_WORD_SOURCES
		.then((wordSources) => {
			return Promise.all(
				wordSources.map((wordSource) => {
					return wordSource.getWordPosts(req.query);
				})
			);
		})
		.then(_.flatten)
		.then((flattenedWords) => {
			return _.sortBy(flattenedWords, [
				(word) => {
					return word.dateCreated ? word.dateCreated.valueOf() * -1 : word.datePublished ? word.datePublished.valueOf() * -1 : 0;
				}
			]);
		})
		.then((sortedWords) => {
			res.send(sortedWords);
		})
		.catch(next);
};

module.exports = actions;
