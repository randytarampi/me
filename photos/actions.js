const searchPhotos = require("./searchPhotos");

const actions = {};

actions.searchPhotos = ({photoSearchParams}, res, next) => {
	return searchPhotos(photoSearchParams)
		.then(sortedPhotos => {
			res.send(sortedPhotos);
		})
		.catch(next);
};

module.exports = actions;
