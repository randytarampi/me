import {Post, POST_STATUS} from "@randy.tarampi/js";
import _ from "lodash";
import {DateTime} from "luxon";
import {AuthInfo} from "../../authInfo";
import CachedDataSource from "../../cachedDataSource";
import {filterPostForOrderingConditionsInSearchParams} from "../util";
import {TwitterAuthInfo} from "./authInfo";
import {getTwitterClient, type} from "./util";

const dateStringToDateTime = dateString => DateTime.fromFormat(dateString, "EEE MMM dd HH:mm:ss ZZZ yyyy");

const tweetJsonToTweetLink = ({id_str, user: {screen_name}}) => `https://twitter.com/${screen_name}/status/${id_str}`;

const tweetJsonToTags = ({entities: {hashtags, symbols}}) => {
    let hashtagTags = hashtags
        ? hashtags.map(hashtag => hashtag.text)
        : [];
    let symbolsTags = symbols
        ? symbols.map(symbol => symbol.text)
        : [];

    return hashtagTags.concat(symbolsTags);
};

const tweetJsonToCreator = ({user: {id_str: id, name, screen_name: username, profile_image_url_https: image}}) => {
    return {
        network: TwitterSource.type,
        id,
        name,
        username,
        url: `https://twitter.com/${username}`,
        image
    };
};


const TWITTER_TITLES = ["🦚", "🦢", "🦜", "🐦", "🐧", "🦅", "🦆", "🦉"];

const tweetJsonToTitle = () => TWITTER_TITLES[Math.round(Math.random() * (TWITTER_TITLES.length - 1))];

const buildLink = (href, text) => `<a target="__blank" rel="noopener noreferrer" href="${href}" data-metrics-event-name="anchor" data-metrics-type="href" data-metrics-name="${text}" data-metrics-label="${text}" data-metrics-value="${href}">${text}</a>`;

const getSliceOfText = (bodyText, indices) => bodyText.slice.apply(bodyText, indices);
const hydrateTwitterHashtagLink = (bodyText, indices, tag) => buildLink(`https://twitter.com/hashtag/${tag}`, getSliceOfText(bodyText, indices));
const hydrateTwitterSymbolLink = (bodyText, indices, symbol) => buildLink(`https://twitter.com/search?q=$${symbol}`, getSliceOfText(bodyText, indices));
const hydrateLink = (bodyText, indices, url) => buildLink(url, getSliceOfText(bodyText, indices));
const hydrateUserMention = (bodyText, indices, screenName) => buildLink(`https://twitter.com/${screenName}`, getSliceOfText(bodyText, indices));

const tweetJsonToBody = ({text: bodyText, entities: {hashtags, media, symbols, urls, user_mentions: userMentions}}) => {
    const replacements = {};

    if (hashtags) {
        hashtags.forEach(({text, indices}) => {
            replacements[getSliceOfText(bodyText, indices)] = hydrateTwitterHashtagLink(bodyText, indices, text);
        });
    }
    if (media) {
        media.forEach(({url, indices}) => {
            replacements[getSliceOfText(bodyText, indices)] = hydrateLink(bodyText, indices, url);
        });
    }
    if (symbols) {
        symbols.forEach(({text, indices}) => {
            replacements[getSliceOfText(bodyText, indices)] = hydrateTwitterSymbolLink(bodyText, indices, text);
        });
    }
    if (urls) {
        urls.forEach(({url, indices}) => {
            replacements[getSliceOfText(bodyText, indices)] = hydrateLink(bodyText, indices, url);
        });
    }
    if (userMentions) {
        userMentions.forEach(({screen_name, indices}) => {
            replacements[getSliceOfText(bodyText, indices)] = hydrateUserMention(bodyText, indices, screen_name);
        });
    }

    const hydratedBody = Object.keys(replacements).reduce((replaced, toBeReplaced) => {
        replaced = replaced.replace(toBeReplaced, replacements[toBeReplaced]);

        return replaced;
    }, bodyText);

    return `<p>${hydratedBody}</p>`;
};

const tweetJsonToLocationCreated = ({coordinates, place}) => {
    if (place) {
        let geo;

        if (coordinates) {
            const [longitude, latitude] = coordinates.coordinates;

            geo = {
                latitude,
                longitude
            };
        } else if (place.bounding_box) {
            const [longitude, latitude] = place.bounding_box[0][0];

            geo = {
                latitude,
                longitude
            };
        }

        return {
            name: place.name,
            additionalName: place.full_name,
            url: place.url,
            geo,
            address: {
                country: place.country,
                countryCode: place.country_code
            }
        };
    }

    if (coordinates) {
        const [longitude, latitude] = coordinates.coordinates;

        return {
            geo: {
                latitude,
                longitude
            }
        };
    }

    return null;
};

export class TwitterSource extends CachedDataSource {
    constructor(dataClient, cacheClient, authInfo) {
        authInfo = authInfo || new AuthInfo({
            token: process.env.TWITTER_API_BEARER_TOKEN,
            tokenSecret: process.env.TWITTER_API_BEARER_TOKEN_SECRET
        });
        const twitterClient = dataClient || getTwitterClient({
            access_token_key: authInfo.token,
            access_token_secret: authInfo.tokenSecret
        });

        super(twitterClient, cacheClient);

        this.authInfo = authInfo;
    }

    static get AuthInfoClient() {
        return TwitterAuthInfo;
    }

    static get type() {
        return type;
    }

    get isEnabled() {
        return !!(this.authInfo && this.authInfo.token && this.authInfo.tokenSecret);
    }

    static instanceToRecord(tweetJson) {
        const {id_str: id, created_at} = tweetJson;

        return Post.fromJS({
            raw: tweetJson,
            id,
            source: TwitterSource.type,
            sourceUrl: tweetJsonToTweetLink(tweetJson),
            dateCreated: dateStringToDateTime(created_at),
            title: tweetJsonToTitle(tweetJson),
            body: tweetJsonToBody(tweetJson),
            creator: tweetJsonToCreator(tweetJson),
            tags: tweetJsonToTags(tweetJson),
            locationCreated: tweetJsonToLocationCreated(tweetJson),
            status: tweetJson.in_reply_to_screen_name
                ? POST_STATUS.hidden
                : POST_STATUS.visible
        });
    }

    async allRecordsGetter(searchParams) {
        let posts = await this.recordsGetter(searchParams);

        if (posts.length) {
            const lastPost = posts[posts.length - 1];
            posts = posts.concat(await this.allRecordsGetter(
                searchParams
                    .set("perPage", 200)
                    .set("beforeId", lastPost.id)
            ));
        }

        return posts;
    }

    recordsGetter(searchParams) {
        return new Promise((resolve, reject) => {
            return this.client.get("statuses/user_timeline", searchParams.Twitter, (error, tweets) => {
                if (error) {
                    return reject(error);
                }

                return resolve(tweets);
            });
        })
            .then(tweetsJson => tweetsJson
                .filter(tweetJson => filterPostForOrderingConditionsInSearchParams(this.constructor.instanceToRecord(tweetJson), searchParams))
                .map(this.constructor.instanceToRecord)
            )
            .then(_.compact);
    }

    recordGetter(tweetId, searchParams) {
        return new Promise((resolve, reject) => {
            return this.client.get("statuses/show", searchParams.set("id", tweetId).Twitter, (error, tweetJson) => {
                if (error) {
                    return reject(error);
                }

                return resolve(tweetJson);
            });
        })
            .then(this.constructor.instanceToRecord);
    }
}

export default TwitterSource;
