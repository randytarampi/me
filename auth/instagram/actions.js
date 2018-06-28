const Request = require("request-promise-native");

const INSTAGRAM_AUTH_URL = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.INSTAGRAM_API_KEY}&redirect_uri=${encodeURIComponent(process.env.INSTAGRAM_AUTH_REDIRECT_URI)}&response_type=code&scope=basic+public_content`;
const INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token";

const actions = {};

actions.authenticate = (req, res) => {
	res.redirect(INSTAGRAM_AUTH_URL);
};

actions.handleRedirect = (req, res, next) => {
	if (req.query.error) {
		return next(new Error(`Error: ${req.query.error}-${req.query.error_description}, with reason: ${req.query.error_reason}`));
	}

	if (req.query.code) {
		return Request({
			method: "POST",
			uri: INSTAGRAM_TOKEN_URL,
			form: {
				client_id: process.env.INSTAGRAM_API_KEY,
				client_secret: process.env.INSTAGRAM_API_SECRET,
				grant_type: "authorization_code",
				redirect_uri: process.env.INSTAGRAM_AUTH_REDIRECT_URI,
				code: req.query.code
			}
		})
			.then((tokenResponse) => {
				res.json(tokenResponse);
			})
			.catch(next);
	}

	res.redirect("/auth/instagram");
};

module.exports = actions;
