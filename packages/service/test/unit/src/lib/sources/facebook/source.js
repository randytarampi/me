import {Gallery, LinkPost, Photo, Post, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams";
import {FacebookAuthInfo} from "../../../../../../src/lib/sources/facebook/authInfo";
import {FacebookSource} from "../../../../../../src/lib/sources/facebook/source";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";

describe("FacebookSource", function () {
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

    let facebookUser;
    let facebookPhoto;
    let facebookPhotos;

    beforeEach(function () {
        process.env.FACEBOOK_ACCESS_TOKEN = "FACEBOOK_ACCESS_TOKEN";

        stubPost = Gallery.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"}), LinkPost.fromJSON({id: "grr"})];

        facebookUser = {
            id: "woof",
            name: "Woof Woof"
        };
        facebookPhoto = {
            id: stubPost.id,
            type: "photo",
            created_time: DateTime.utc().toISO(),
            from: facebookUser,
            place: {
                id: "meow",
                name: "Meow",
                location: {
                    latitude: 49.2845,
                    longitude: -123.1116,
                    city: "grr",
                    country: "rawr",
                    state: "ARF",
                    region: "YIP",
                    street: "742 Evergreen Terrace",
                    zip: "90210"
                }
            },
            name: "Woof!",
            message: "Woof woof woof.",
            attachments: {
                data: [
                    {
                        description: "I’ve thought about this piece, involving the experiences of journalists of colour, a lot the last few months.",
                        media: {
                            image: {
                                height: 80,
                                src: "https://external.xx.fbcdn.net/safe_image.php?d=AQAxy9HIjiWPR4ky&w=80&h=80&url=https%3A%2F%2Fcdn-images-1.medium.com%2Ffit%2Fc%2F80%2F80%2F0%2AtF62-4vZ4hEKSiCz&cfs=1&sx=0&sy=0&sw=80&sh=80&_nc_hash=AQArGzDDm6O0mZe2",
                                width: 80
                            }
                        },
                        target: {
                            url: "https://l.facebook.com/l.php?u=https%3A%2F%2Fmedium.com%2F%40sunny.dhillon83%2Fjournalism-while-brown-and-when-to-walk-away-9333ef61de9a%3Ffbclid%3DIwAR04e17pu-takP5po3IYVq6pe88UvhO6Ss_GbeqbB1Gxv2gEqwvH8enrfvo&h=AT3p72ZL0lAqYLtDXpymgOi9JizurDeB_2sluHnK0dqgs42b3maBcphrkfrBWdFguVxuxFG_0DevAKW1rUvlADN7RcFjmgzn0TTfkRvr-prMX4Xf87AZxFrjIKWGTg&s=1"
                        },
                        title: "Journalism While Brown and When to Walk Away – Sunny Dhillon – Medium",
                        type: "share",
                        url: "https://l.facebook.com/l.php?u=https%3A%2F%2Fmedium.com%2F%40sunny.dhillon83%2Fjournalism-while-brown-and-when-to-walk-away-9333ef61de9a%3Ffbclid%3DIwAR04e17pu-takP5po3IYVq6pe88UvhO6Ss_GbeqbB1Gxv2gEqwvH8enrfvo&h=AT3p72ZL0lAqYLtDXpymgOi9JizurDeB_2sluHnK0dqgs42b3maBcphrkfrBWdFguVxuxFG_0DevAKW1rUvlADN7RcFjmgzn0TTfkRvr-prMX4Xf87AZxFrjIKWGTg&s=1"
                    }
                ]
            },
            privacy: {
                value: "EVERYONE"
            }
        };
        facebookPhotos = stubPosts.map(stubPost => Object.assign({}, facebookPhoto, {id: stubPost.id}));

        delete facebookPhotos[0].place;
        facebookPhotos[0].attachments = {
            data: [
                {
                    media: {
                        image: {
                            height: 450,
                            src: "https://scontent.xx.fbcdn.net/v/t31.0-8/q81/s720x720/18449468_10158501781540417_7190106383948038270_o.jpg?_nc_cat=109&_nc_ht=scontent.xx&oh=9e6fd9d16cea03e90dd17a7066ddc2c0&oe=5CF8D1D2",
                            width: 720
                        }
                    },
                    subattachments: {
                        data: [
                            {
                                description: "That snow emoji and some people emoji",
                                media: {
                                    image: {
                                        height: 450,
                                        src: "https://scontent.xx.fbcdn.net/v/t31.0-8/q81/s720x720/18449468_10158501781540417_7190106383948038270_o.jpg?_nc_cat=109&_nc_ht=scontent.xx&oh=9e6fd9d16cea03e90dd17a7066ddc2c0&oe=5CF8D1D2",
                                        width: 720
                                    }
                                },
                                target: {
                                    id: "10158501781540417",
                                    url: "https://www.facebook.com/photo.php?fbid=10158501781540417&set=p.10158501781540417&type=3"
                                },
                                type: "photo",
                                url: "https://www.facebook.com/photo.php?fbid=10158501781540417&set=p.10158501781540417&type=3"
                            },
                            {
                                media: {
                                    image: {
                                        height: 720,
                                        src: "https://scontent.xx.fbcdn.net/v/t31.0-8/q81/p720x720/18449493_10158501781760417_3408169483874304687_o.jpg?_nc_cat=107&_nc_ht=scontent.xx&oh=a10b67ce419561e285253d476872a69a&oe=5CFAEB23",
                                        width: 720
                                    }
                                },
                                target: {
                                    id: "10158501781760417",
                                    url: "https://www.facebook.com/photo.php?fbid=10158501781760417&set=p.10158501781760417&type=3"
                                },
                                type: "photo",
                                url: "https://www.facebook.com/photo.php?fbid=10158501781760417&set=p.10158501781760417&type=3"
                            },
                            {
                                description: "❄️🌈☂️",
                                media: {
                                    image: {
                                        height: 405,
                                        src: "https://scontent.xx.fbcdn.net/v/t31.0-8/q84/s720x720/18449645_10158501781955417_1897165271556995768_o.jpg?_nc_cat=107&_nc_ht=scontent.xx&oh=22a3c7a307f4fede11ae885afed5d35a&oe=5CF17729",
                                        width: 720
                                    }
                                },
                                target: {
                                    id: "10158501781955417",
                                    url: "https://www.facebook.com/photo.php?fbid=10158501781955417&set=p.10158501781955417&type=3"
                                },
                                type: "photo",
                                url: "https://www.facebook.com/photo.php?fbid=10158501781955417&set=p.10158501781955417&type=3"
                            },
                            {
                                description: "🚋",
                                media: {
                                    image: {
                                        height: 450,
                                        src: "https://scontent.xx.fbcdn.net/v/t31.0-8/q82/s720x720/18556458_10158501782345417_8670052061428827966_o.jpg?_nc_cat=108&_nc_ht=scontent.xx&oh=d608c99ea7086ac34e4c0f73f69397e3&oe=5CB378E6",
                                        width: 720
                                    }
                                },
                                target: {
                                    id: "10158501782345417",
                                    url: "https://www.facebook.com/photo.php?fbid=10158501782345417&set=p.10158501782345417&type=3"
                                },
                                type: "photo",
                                url: "https://www.facebook.com/photo.php?fbid=10158501782345417&set=p.10158501782345417&type=3"
                            },
                            {
                                description: "Strongest flag is Turkish flag",
                                media: {
                                    image: {
                                        height: 478,
                                        src: "https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/18451549_10158501783715417_8245522618050003719_o.jpg?_nc_cat=101&_nc_ht=scontent.xx&oh=20de3c08073ea3fb8b70d30fa49ea5aa&oe=5CFBE6AB",
                                        width: 720
                                    }
                                },
                                target: {
                                    id: "10158501783715417",
                                    url: "https://www.facebook.com/photo.php?fbid=10158501783715417&set=p.10158501783715417&type=3"
                                },
                                type: "photo",
                                url: "https://www.facebook.com/photo.php?fbid=10158501783715417&set=p.10158501783715417&type=3"
                            },
                            {
                                description: "Selfie",
                                media: {
                                    image: {
                                        height: 478,
                                        src: "https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/18491622_10158501784755417_345463931996844729_o.jpg?_nc_cat=102&_nc_ht=scontent.xx&oh=bca8bef4da58f1b0d62e701ee2d290be&oe=5CF7C633",
                                        width: 720
                                    }
                                },
                                target: {
                                    id: "10158501784755417",
                                    url: "https://www.facebook.com/photo.php?fbid=10158501784755417&set=p.10158501784755417&type=3"
                                },
                                type: "photo",
                                url: "https://www.facebook.com/photo.php?fbid=10158501784755417&set=p.10158501784755417&type=3"
                            },
                            {
                                media: {
                                    image: {
                                        height: 478,
                                        src: "https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/18517931_10158501784975417_6345967112259646262_o.jpg?_nc_cat=107&_nc_ht=scontent.xx&oh=d8ad2981f544eb1a4f57cd210e6ae284&oe=5D003D8A",
                                        width: 720
                                    }
                                },
                                target: {
                                    id: "10158501784975417",
                                    url: "https://www.facebook.com/photo.php?fbid=10158501784975417&set=p.10158501784975417&type=3"
                                },
                                type: "photo",
                                url: "https://www.facebook.com/photo.php?fbid=10158501784975417&set=p.10158501784975417&type=3"
                            },
                            {
                                media: {
                                    image: {
                                        height: 720,
                                        src: "https://scontent.xx.fbcdn.net/v/t31.0-8/q87/s720x720/18556593_10158501785195417_3850230462631003358_o.jpg?_nc_cat=103&_nc_ht=scontent.xx&oh=88713b421e0352c2358017c2cf711a4d&oe=5CB528BE",
                                        width: 540
                                    }
                                },
                                target: {
                                    id: "10158501785195417",
                                    url: "https://www.facebook.com/photo.php?fbid=10158501785195417&set=p.10158501785195417&type=3"
                                },
                                type: "photo",
                                url: "https://www.facebook.com/photo.php?fbid=10158501785195417&set=p.10158501785195417&type=3"
                            }
                        ]
                    },
                    target: {
                        url: "https://www.facebook.com/media/set/?set=ms.c.eJxdy8ENACEQAsCOzKIgbv%7E_NmXtd5DvJoKCjgg%7E%3BEIjzwi3dKS6%7E%3BMxZBlhNC52A4R%7E_pMLFDEczw%7E-%7E-.bps.&type=1"
                    },
                    type: "album",
                    url: "https://www.facebook.com/media/set/?set=ms.c.eJxdy8ENACEQAsCOzKIgbv%7E_NmXtd5DvJoKCjgg%7E%3BEIjzwi3dKS6%7E%3BMxZBlhNC52A4R%7E_pMLFDEczw%7E-%7E-.bps.&type=1"
                }
            ]
        };

        delete facebookPhotos[1].message;
        delete facebookPhotos[1].place.location.state;
        delete facebookPhotos[1].privacy;
        facebookPhotos[1].attachments = {
            data: [
                {
                    description: "Method + Method = Madness?\n\nOn the one hand, all these lines look very confusing, and on the other I guess they still look confusing. 🤷‍♂️\n\n#funemployment #method #madness #confused #ordered #lines #contrast #reflection #wet #architecture #tile #symmetry #brokensymmetry #city #urban #downtown #downtownvancouver #yvr #vancouver #vancouverpubliclibrary #vancouverlibrary",
                    media: {
                        image: {
                            height: 720,
                            src: "https://scontent.xx.fbcdn.net/v/t1.0-9/p720x720/47685965_10160949382690417_7675522856247099392_o.jpg?_nc_cat=103&_nc_ht=scontent.xx&oh=9608e2b0da01394345accc426ff6f524&oe=5CF2F67B",
                            width: 720
                        }
                    },
                    target: {
                        id: "10160949382680417",
                        url: "https://www.facebook.com/photo.php?fbid=10160949382680417&set=p.10160949382680417&type=3"
                    },
                    type: "photo",
                    url: "https://www.facebook.com/photo.php?fbid=10160949382680417&set=p.10160949382680417&type=3"
                }
            ]
        };

        facebookPhotos[2].type = "share";
        facebookPhotos[2].privacy.value = "ALL_FRIENDS";

        facebookPhotos[3].type = "link";
        facebookPhotos[3].privacy.value = "ALL_FRIENDS";

        stubServiceClient = {
            get: sinon.stub().callsFake((edge, params) => {
                switch (edge) {
                    case "me/feed": {
                        let posts = facebookPhotos;

                        if (params.count === 42) { // NOTE-RT: 42 is a sentinel value for an empty array
                            posts = [];
                        }

                        if (stubServiceClient.get.callCount > 1) {
                            posts = [];
                        }

                        return Promise.resolve({
                            data: posts
                        });
                    }

                    default:
                        return Promise.resolve({
                            data: facebookPhotos.find(facebookBlogPost => facebookBlogPost.id === edge)
                        });
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

        stubInstanceToRecord = sinon.stub().callsFake(Photo.fromJSON);

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
        it("should build a `FacebookSource` instance (including the default `facebook` client)", function () {
            const facebookSource = new FacebookSource(null, stubCacheClient);

            expect(FacebookSource.type).to.eql("facebook");
            expect(facebookSource.cacheClient).to.eql(stubCacheClient);
            expect(facebookSource.initializing).to.be.instanceOf(Promise);
            expect(facebookSource).to.be.instanceOf(FacebookSource);
        });

        it("should build a `FacebookSource` instance (with stubbed client)", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);

            expect(FacebookSource.type).to.eql("facebook");
            expect(facebookSource.client).to.eql(stubServiceClient);
            expect(facebookSource.cacheClient).to.eql(stubCacheClient);
            expect(facebookSource.initializing).to.be.instanceOf(Promise);
            expect(facebookSource).to.be.instanceOf(FacebookSource);
        });
    });

    describe("AuthInfoClient", function () {
        it("returns `FacebookAuthInfo`", function () {
            expect(FacebookSource.AuthInfoClient).to.eql(FacebookAuthInfo);
        });
    });

    describe("isEnabled", function () {
        it("`isEnabled` if `process.env.FACEBOOK_ACCESS_TOKEN` is defined", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            expect(facebookSource.isEnabled).to.eql(true);
        });

        it("`!isEnabled` if `process.env.FACEBOOK_ACCESS_TOKEN` is not defined", function () {
            delete process.env.FACEBOOK_ACCESS_TOKEN;
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            expect(facebookSource.isEnabled).to.eql(false);
        });
    });

    describe("recordsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, min_id: "meow", max_id: "grr"});

            return facebookSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        switch (post.type) {
                            case Gallery.type:
                                expect(post).to.be.instanceof(Gallery);
                                break;

                            case Photo.type:
                                expect(post).to.be.instanceof(Photo);
                                break;

                            case LinkPost.type:
                                expect(post).to.be.instanceof(LinkPost);
                                break;

                            case Post.type:
                            default:
                                expect(post).to.be.instanceof(Post);
                                break;
                        }
                    });
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "me/feed", sinon.match({count: stubParams.perPage}));
                });
        });

        it("finds no posts", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 42});

            return facebookSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "me/feed", sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 40, min_id: "meow", max_id: "grr"});

            return facebookSource.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(stubPosts.length);
                    posts.map(post => {
                        switch (post.type) {
                            case Gallery.type:
                                expect(post).to.be.instanceof(Gallery);
                                break;

                            case Photo.type:
                                expect(post).to.be.instanceof(Photo);
                                break;

                            case LinkPost.type:
                                expect(post).to.be.instanceof(LinkPost);
                                break;

                            case Post.type:
                            default:
                                expect(post).to.be.instanceof(Post);
                                break;
                        }
                    });
                    sinon.assert.calledTwice(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "me/feed", sinon.match({count: stubParams.perPage}));
                });
        });

        it("swallows errors assuming rate-limiting ", function () {
            stubServiceClient = {
                get: sinon.stub().callsFake((edge, params) => {
                    switch (edge) {
                        case "me/feed": {
                            let posts = facebookPhotos;

                            if (params.count === 42) { // NOTE-RT: 42 is a sentinel value for an empty array
                                posts = [];
                            }

                            if (stubServiceClient.get.callCount > 1) {
                                return Promise.reject(new Error("woof"));
                            }

                            return Promise.resolve({
                                data: posts
                            });
                        }

                        default:
                            return Promise.resolve({
                                data: facebookPhotos.find(facebookBlogPost => facebookBlogPost.id === edge)
                            });
                    }
                })
            };

            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 40, min_id: "meow", max_id: "grr"});

            return facebookSource.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(stubPosts.length);
                    posts.map(post => {
                        switch (post.type) {
                            case Gallery.type:
                                expect(post).to.be.instanceof(Gallery);
                                break;

                            case Photo.type:
                                expect(post).to.be.instanceof(Photo);
                                break;

                            case LinkPost.type:
                                expect(post).to.be.instanceof(LinkPost);
                                break;

                            case Post.type:
                            default:
                                expect(post).to.be.instanceof(Post);
                                break;
                        }
                    });
                    sinon.assert.calledTwice(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "me/feed", sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);

            return facebookSource.recordGetter(stubPost.id)
                .then(post => {
                    expect(post).to.be.instanceof(Gallery);
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, stubPost.id);
                });
        });

        it("finds no post", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);

            return facebookSource.recordGetter("foo")
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "foo");
                });
        });
    });
});
