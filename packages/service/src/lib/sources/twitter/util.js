import Twitter from "twitter";

const type = "twitter";

const getTwitterClientForSearchParams = searchParams => getTwitterClient(searchParams.OAuth);

const getTwitterClient = twitterOAuthCredentials => new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_API_BEARER_TOKEN,
    access_token_secret: process.env.TWITTER_API_BEARER_TOKEN_SECRET,
    ...twitterOAuthCredentials
});
export {type, getTwitterClientForSearchParams, getTwitterClient};

export default {type, getTwitterClientForSearchParams, getTwitterClient};
