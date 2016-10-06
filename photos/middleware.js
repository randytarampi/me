const SearchParams = require("./searchParams");

const middleware = {};

middleware.parsePhotoSearchParams = (req, res, next) => {
	req.photoSearchParams = new SearchParams({
		page: parseInt(req.query.page, 10),
		perPage: parseInt(req.query.perPage, 10)
	});
	next();
};

module.exports = middleware;
