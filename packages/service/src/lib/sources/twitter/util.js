import Twitter from "twitter";

export const type = "twitter";

export const getTwitterClientForSearchParams = searchParams => getTwitterClient(searchParams.OAuth);

export const getTwitterClient = twitterOAuthCredentials => new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_API_BEARER_TOKEN,
    access_token_secret: process.env.TWITTER_API_BEARER_TOKEN_SECRET,
    ...twitterOAuthCredentials
});
