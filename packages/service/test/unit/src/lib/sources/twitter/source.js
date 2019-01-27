import {Post} from "@randy.tarampi/js";
import {Big} from "big.js";
import {expect} from "chai";
import sinon from "sinon";
import Twitter from "twitter";
import PostSearchParams from "../../../../../../src/lib/postSearchParams";
import {TwitterAuthInfo} from "../../../../../../src/lib/sources/twitter/authInfo";
import {TwitterSource} from "../../../../../../src/lib/sources/twitter/source";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../../../lib/util";

describe("TwitterSource", function () {
    let stubServiceClient;
    let stubPost;
    let stubPosts;
    let stubBeforeRecordsGetter;
    let stubRecordsGetter;
    let stubAfterRecordsGetter;
    let stubBeforeRecordGetter;
    let stubRecordGetter;
    let stubAfterRecordGetter;
    let stubBeforeCachedRecordsGetter;
    let stubCachedRecordsGetter;
    let stubAfterCachedRecordsGetter;
    let stubBeforeCachedRecordGetter;
    let stubCachedRecordGetter;
    let stubAfterCachedRecordGetter;
    let stubInstanceToRecord;
    let DummyCacheClient;
    let stubCreateRecords;
    let stubGetRecords;
    let stubCreateRecord;
    let stubGetRecord;
    let stubCacheClient;
    let builtDummyClasses;
    let dummyClassBuilderArguments;

    let twitterTweet;
    let twitterTweets;

    beforeEach(function () {
        process.env.TWITTER_API_BEARER_TOKEN = "TWITTER_API_BEARER_TOKEN";
        process.env.TWITTER_API_BEARER_TOKEN_SECRET = "TWITTER_API_BEARER_TOKEN_SECRET";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"}), Post.fromJSON({id: "rawr"}), Post.fromJSON({id: "argh"})];

        twitterTweet = {
            "created_at": "Thu Apr 06 15:28:43 +0000 2017",
            "id": 850007368138018817,
            "id_str": "850007368138018817",
            "text": "RT @TwitterDev: 1/ Today we’re sharing our vision for the future of the Twitter API platform!\nhttps://t.co/XweGngmxlP",
            "truncated": false,
            "entities": {
                "hashtags": [
                    {
                        "text": "hashtag",
                        "indices": [
                            59,
                            67
                        ]
                    },
                    {
                        "text": "twtr",
                        "indices": [
                            29,
                            34
                        ]
                    }
                ],
                "urls": [
                    {
                        "url": "https://t.co/RzmrQ6wAzD",
                        "expanded_url": "http://bit.ly/2pUk4be",
                        "display_url": "bit.ly/2pUk4be",
                        "unwound": {
                            "url": "https://blog.gnip.com/tweeting-in-the-rain/",
                            "status": 200,
                            "title": "Tweeting in the Rain, Part 1 - Gnip Blog - Social Data and Data Science Blog",
                            "description": "If you would have told me a few years ago that one day I’d be comparing precipitation and social media time-series data, I would have assumed you were joking.  For 13 years at OneRain I helped develop software and monitoring … Continue reading →"
                        },
                        "indices": [
                            35,
                            58
                        ]
                    }
                ],
                "user_mentions": [
                    {
                        "screen_name": "MentionThis",
                        "name": "Just Me",
                        "id": 50247739,
                        "id_str": "50247739",
                        "indices": [
                            16,
                            28
                        ]
                    }
                ],
                "symbols": [
                    {
                        "text": "twtr",
                        "indices": [
                            29,
                            34
                        ]
                    }
                ],
                "media": [
                    {
                        "id": 861627472244162561,
                        "id_str": "861627472244162561",
                        "indices": [
                            68,
                            91
                        ],
                        "media_url": "http://pbs.twimg.com/media/C_UdnvPUwAE3Dnn.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/C_UdnvPUwAE3Dnn.jpg",
                        "url": "https://t.co/9r69akA484",
                        "display_url": "pic.twitter.com/9r69akA484",
                        "expanded_url": "https://twitter.com/FloodSocial/status/861627479294746624/photo/1",
                        "type": "photo",
                        "sizes": {
                            "medium": {
                                "w": 1200,
                                "h": 900,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 680,
                                "h": 510,
                                "resize": "fit"
                            },
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "large": {
                                "w": 2048,
                                "h": 1536,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "extended_entities": {
                "media": [
                    {
                        "id": 861627472244162561,
                        "id_str": "861627472244162561",
                        "indices": [
                            68,
                            91
                        ],
                        "media_url": "http://pbs.twimg.com/media/C_UdnvPUwAE3Dnn.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/C_UdnvPUwAE3Dnn.jpg",
                        "url": "https://t.co/9r69akA484",
                        "display_url": "pic.twitter.com/9r69akA484",
                        "expanded_url": "https://twitter.com/FloodSocial/status/861627479294746624/photo/1",
                        "type": "photo",
                        "sizes": {
                            "medium": {
                                "w": 1200,
                                "h": 900,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 680,
                                "h": 510,
                                "resize": "fit"
                            },
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "large": {
                                "w": 2048,
                                "h": 1536,
                                "resize": "fit"
                            }
                        }
                    },
                    {
                        "id": 861627472244203520,
                        "id_str": "861627472244203520",
                        "indices": [
                            68,
                            91
                        ],
                        "media_url": "http://pbs.twimg.com/media/C_UdnvPVYAAZbEs.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/C_UdnvPVYAAZbEs.jpg",
                        "url": "https://t.co/9r69akA484",
                        "display_url": "pic.twitter.com/9r69akA484",
                        "expanded_url": "https://twitter.com/FloodSocial/status/861627479294746624/photo/1",
                        "type": "photo",
                        "sizes": {
                            "small": {
                                "w": 680,
                                "h": 680,
                                "resize": "fit"
                            },
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "medium": {
                                "w": 1200,
                                "h": 1200,
                                "resize": "fit"
                            },
                            "large": {
                                "w": 2048,
                                "h": 2048,
                                "resize": "fit"
                            }
                        }
                    },
                    {
                        "id": 861627474144149504,
                        "id_str": "861627474144149504",
                        "indices": [
                            68,
                            91
                        ],
                        "media_url": "http://pbs.twimg.com/media/C_Udn2UUQAADZIS.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/C_Udn2UUQAADZIS.jpg",
                        "url": "https://t.co/9r69akA484",
                        "display_url": "pic.twitter.com/9r69akA484",
                        "expanded_url": "https://twitter.com/FloodSocial/status/861627479294746624/photo/1",
                        "type": "photo",
                        "sizes": {
                            "medium": {
                                "w": 1200,
                                "h": 900,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 680,
                                "h": 510,
                                "resize": "fit"
                            },
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "large": {
                                "w": 2048,
                                "h": 1536,
                                "resize": "fit"
                            }
                        }
                    },
                    {
                        "id": 861627474760708096,
                        "id_str": "861627474760708096",
                        "indices": [
                            68,
                            91
                        ],
                        "media_url": "http://pbs.twimg.com/media/C_Udn4nUMAAgcIa.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/C_Udn4nUMAAgcIa.jpg",
                        "url": "https://t.co/9r69akA484",
                        "display_url": "pic.twitter.com/9r69akA484",
                        "expanded_url": "https://twitter.com/FloodSocial/status/861627479294746624/photo/1",
                        "type": "photo",
                        "sizes": {
                            "small": {
                                "w": 680,
                                "h": 680,
                                "resize": "fit"
                            },
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "medium": {
                                "w": 1200,
                                "h": 1200,
                                "resize": "fit"
                            },
                            "large": {
                                "w": 2048,
                                "h": 2048,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 6253282,
                "id_str": "6253282",
                "name": "Twitter API",
                "screen_name": "twitterapi",
                "location": "San Francisco, CA",
                "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",
                "url": "http://t.co/78pYTvWfJd",
                "entities": {
                    "url": {
                        "urls": [
                            {
                                "url": "http://t.co/78pYTvWfJd",
                                "expanded_url": "https://dev.twitter.com",
                                "display_url": "dev.twitter.com",
                                "indices": [
                                    0,
                                    22
                                ]
                            }
                        ]
                    },
                    "description": {
                        "urls": []
                    }
                },
                "protected": false,
                "followers_count": 6172353,
                "friends_count": 46,
                "listed_count": 13091,
                "created_at": "Wed May 23 06:01:13 +0000 2007",
                "favourites_count": 26,
                "utc_offset": -25200,
                "time_zone": "Pacific Time (US & Canada)",
                "geo_enabled": true,
                "verified": true,
                "statuses_count": 3583,
                "lang": "en",
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "C0DEED",
                "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/656927849/miyt9dpjz77sc0w3d4vj.png",
                "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/656927849/miyt9dpjz77sc0w3d4vj.png",
                "profile_background_tile": true,
                "profile_image_url": "http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/6253282/1431474710",
                "profile_link_color": "0084B4",
                "profile_sidebar_border_color": "C0DEED",
                "profile_sidebar_fill_color": "DDEEF6",
                "profile_text_color": "333333",
                "profile_use_background_image": true,
                "has_extended_profile": false,
                "default_profile": false,
                "default_profile_image": false,
                "following": true,
                "follow_request_sent": false,
                "notifications": false,
                "translator_type": "regular"
            },
            "geo": null,
            "coordinates": {
                "coordinates": [-1, 1]
            },
            "place": {
                "name": "Woof",
                "full_name": "Woof Woof",
                "url": "woof://woof.woof/woof/woof",
                "country": "Woof!",
                "country_code": "WF",
                "bounding_box": [[
                    [0, 0],
                    [-1, -1],
                    [-1, 1],
                    [1, 1],
                    [1, -1]
                ]]
            },
            "contributors": null,
            "retweeted_status": {
                "created_at": "Thu Apr 06 15:24:15 +0000 2017",
                "id": 850006245121695744,
                "id_str": "850006245121695744",
                "text": "1/ Today we’re sharing our vision for the future of the Twitter API platform!nhttps://t.co/XweGngmxlP",
                "truncated": false,
                "entities": {
                    "hashtags": [],
                    "symbols": [],
                    "user_mentions": [],
                    "urls": [
                        {
                            "url": "https://t.co/XweGngmxlP",
                            "expanded_url": "https://cards.twitter.com/cards/18ce53wgo4h/3xo1c",
                            "display_url": "cards.twitter.com/cards/18ce53wg…",
                            "indices": [
                                78,
                                101
                            ]
                        }
                    ]
                },
                "source": "<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>",
                "in_reply_to_status_id": null,
                "in_reply_to_status_id_str": null,
                "in_reply_to_user_id": null,
                "in_reply_to_user_id_str": null,
                "in_reply_to_screen_name": null,
                "user": {
                    "id": 2244994945,
                    "id_str": "2244994945",
                    "name": "TwitterDev",
                    "screen_name": "TwitterDev",
                    "location": "Internet",
                    "description": "Your official source for Twitter Platform news, updates & events. Need technical help? Visit https://t.co/mGHnxZCxkt ⌨️  #TapIntoTwitter",
                    "url": "https://t.co/66w26cua1O",
                    "entities": {
                        "url": {
                            "urls": [
                                {
                                    "url": "https://t.co/66w26cua1O",
                                    "expanded_url": "https://dev.twitter.com/",
                                    "display_url": "dev.twitter.com",
                                    "indices": [
                                        0,
                                        23
                                    ]
                                }
                            ]
                        },
                        "description": {
                            "urls": [
                                {
                                    "url": "https://t.co/mGHnxZCxkt",
                                    "expanded_url": "https://twittercommunity.com/",
                                    "display_url": "twittercommunity.com",
                                    "indices": [
                                        93,
                                        116
                                    ]
                                }
                            ]
                        }
                    },
                    "protected": false,
                    "followers_count": 465425,
                    "friends_count": 1523,
                    "listed_count": 1168,
                    "created_at": "Sat Dec 14 04:35:55 +0000 2013",
                    "favourites_count": 2098,
                    "utc_offset": -25200,
                    "time_zone": "Pacific Time (US & Canada)",
                    "geo_enabled": true,
                    "verified": true,
                    "statuses_count": 3031,
                    "lang": "en",
                    "contributors_enabled": false,
                    "is_translator": false,
                    "is_translation_enabled": false,
                    "profile_background_color": "FFFFFF",
                    "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
                    "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
                    "profile_background_tile": false,
                    "profile_image_url": "http://pbs.twimg.com/profile_images/530814764687949824/npQQVkq8_normal.png",
                    "profile_image_url_https": "https://pbs.twimg.com/profile_images/530814764687949824/npQQVkq8_normal.png",
                    "profile_banner_url": "https://pbs.twimg.com/profile_banners/2244994945/1396995246",
                    "profile_link_color": "0084B4",
                    "profile_sidebar_border_color": "FFFFFF",
                    "profile_sidebar_fill_color": "DDEEF6",
                    "profile_text_color": "333333",
                    "profile_use_background_image": false,
                    "has_extended_profile": false,
                    "default_profile": false,
                    "default_profile_image": false,
                    "following": true,
                    "follow_request_sent": false,
                    "notifications": false,
                    "translator_type": "regular"
                },
                "geo": null,
                "coordinates": null,
                "place": null,
                "contributors": null,
                "is_quote_status": false,
                "retweet_count": 284,
                "favorite_count": 399,
                "favorited": false,
                "retweeted": false,
                "possibly_sensitive": false,
                "lang": "en"
            },
            "is_quote_status": false,
            "retweet_count": 284,
            "favorite_count": 0,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "lang": "en"
        };
        twitterTweets = stubPosts.map(stubPost => Object.assign({}, twitterTweet, {id: stubPost.id}));
        twitterTweets[0].entities = {};
        delete twitterTweets[1].coordinates;
        delete twitterTweets[2].coordinates;
        delete twitterTweets[2].place;
        twitterTweets[3].in_reply_to_screen_name = true;
        delete twitterTweets[3].coordinates;
        delete twitterTweets[3].place.bounding_box;
        delete twitterTweets[4].place;
        stubServiceClient = {
            get: sinon.stub().callsFake((endpoint, searchParams, callback) => {
                switch (endpoint) {
                    case "statuses/user_timeline":
                        if (searchParams.count === 42 || (searchParams.max_id && new Big(searchParams.max_id).lt(new Big(twitterTweet.id_str)))) {
                            callback(null, []);
                        } else if (searchParams.count === 666) {
                            callback(new Error(searchParams.count), null);
                        } else {
                            callback(null, twitterTweets);
                        }
                        break;

                    case "statuses/show":
                        if (searchParams.id === 666) {
                            callback(new Error(searchParams.id), null);
                        } else {
                            callback(null, twitterTweets.find(tweet => tweet.id === searchParams.id));
                        }
                        break;

                    default:
                        throw new Error("Wtf? This should've thrown");
                }
            })
        };

        stubBeforeRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterRecordsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforeRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterRecordGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubBeforeCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterCachedRecordsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforeCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterCachedRecordGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubInstanceToRecord = sinon.stub().callsFake(Post.fromJSON);

        stubCreateRecords = sinon.stub().callsFake(posts => timedPromise(posts));
        stubGetRecords = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreateRecord = sinon.stub().callsFake(post => timedPromise(post));
        stubGetRecord = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubBeforeRecordsGetter,
            stubRecordsGetter,
            stubAfterRecordsGetter,

            stubBeforeRecordGetter,
            stubRecordGetter,
            stubAfterRecordGetter,

            stubBeforeCachedRecordsGetter,
            stubCachedRecordsGetter,
            stubAfterCachedRecordsGetter,

            stubBeforeCachedRecordGetter,
            stubCachedRecordGetter,
            stubAfterCachedRecordGetter,

            stubInstanceToRecord,

            stubGetRecords,
            stubCreateRecords,

            stubGetRecord,
            stubCreateRecord
        };
        builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

        DummyCacheClient = builtDummyClasses.DummyCacheClient;

        stubCacheClient = new DummyCacheClient("ᶘ ◕ᴥ◕ᶅ");
    });

    describe("constructor", function () {
        it("should build a `TwitterSource` instance (including the default `twitter` client)", function () {
            const twitterSource = new TwitterSource(null, stubCacheClient);

            expect(TwitterSource.type).to.eql("twitter");
            expect(twitterSource.client).to.be.instanceof(Twitter); // NOTE-RT: It's not so much a class as it is just an exported anonymous function
            expect(twitterSource.cacheClient).to.eql(stubCacheClient);
            expect(twitterSource.initializing).to.be.instanceOf(Promise);
            expect(twitterSource).to.be.instanceOf(TwitterSource);
        });

        it("should build a `TwitterSource` instance (with stubbed client)", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);

            expect(TwitterSource.type).to.eql("twitter");
            expect(twitterSource.client).to.eql(stubServiceClient);
            expect(twitterSource.cacheClient).to.eql(stubCacheClient);
            expect(twitterSource.initializing).to.be.instanceOf(Promise);
            expect(twitterSource).to.be.instanceOf(TwitterSource);
        });
    });

    describe("AuthInfoClient", function () {
        it("returns `TwitterAuthInfo`", function () {
            expect(TwitterSource.AuthInfoClient).to.eql(TwitterAuthInfo);
        });
    });

    describe("isEnabled", function () {
        it("`isEnabled` if `process.env.TWITTER_API_BEARER_TOKEN` and `process.env.TWITTER_API_BEARER_TOKEN_SECRET` are defined", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            expect(twitterSource.isEnabled).to.eql(true);
        });

        it("`!isEnabled` if `process.env.TWITTER_ACCESS_TOKEN` is not defined", function () {
            delete process.env.TWITTER_API_BEARER_TOKEN;
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            expect(twitterSource.isEnabled).to.eql(false);
        });
    });

    describe("instanceToRecord", function () {
        it("deduplicates `tags`", function () {
            const tweetPost = TwitterSource.instanceToRecord(twitterTweet);
            expect(tweetPost.tags.filter(tag => tag === "twtr").size).to.eql(1);
        });
    });

    describe("recordsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, afterId: "123", beforeId: "123"});

            return twitterSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => expect(post).to.be.instanceof(Post));
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "statuses/user_timeline", sinon.match({
                        count: stubParams.perPage,
                        since_id: stubParams.afterId,
                        max_id: "122"
                    }));
                });
        });

        it("handles errors", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 666});

            return twitterSource.recordsGetter(stubParams)
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.eql("666");
                });
        });

        it("finds no posts", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 42});

            return twitterSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "statuses/user_timeline", sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 40});

            return twitterSource.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(stubPosts.length);
                    posts.map(post => expect(post).to.be.instanceof(Post));
                    sinon.assert.calledTwice(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "statuses/user_timeline", sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS();

            return twitterSource.recordGetter(stubPost.id, stubParams)
                .then(post => {
                    expect(post).to.be.instanceof(Post);
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "statuses/show", {id: stubPost.id});
                });
        });

        it("handles errors", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS();

            return twitterSource.recordGetter(666, stubParams)
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.eql("666");
                });
        });

        it("finds no post", function () {
            const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS();

            return twitterSource.recordGetter("foo", stubParams)
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "statuses/show", {id: "foo"});
                });
        });
    });
});
