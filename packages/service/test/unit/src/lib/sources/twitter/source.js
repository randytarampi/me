// import {Gallery, Photo} from "@randy.tarampi/js";
// import {expect} from "chai";
// import {DateTime} from "luxon";
// import fetch from "node-fetch"; // eslint-disable-line import/no-extraneous-dependencies
// import sinon from "sinon";
// import PostSearchParams from "../../../../../../src/lib/postSearchParams";
// import {TwitterAuthInfo} from "../../../../../../src/lib/sources/twitter/authInfo";
// import {TwitterSource} from "../../../../../../src/lib/sources/twitter/source";
// import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";
// import {timedPromise} from "../../../../../lib/util";
//
// describe("TwitterSource", function () {
//     let stubServiceClient;
//     let stubPost;
//     let stubPosts;
//     let stubBeforeRecordsGetter;
//     let stubRecordsGetter;
//     let stubAfterRecordsGetter;
//     let stubBeforeRecordGetter;
//     let stubRecordGetter;
//     let stubAfterRecordGetter;
//     let stubBeforeCachedRecordsGetter;
//     let stubCachedRecordsGetter;
//     let stubAfterCachedRecordsGetter;
//     let stubBeforeCachedRecordGetter;
//     let stubCachedRecordGetter;
//     let stubAfterCachedRecordGetter;
//     let stubInstanceToRecord;
//     let DummyCacheClient;
//     let stubCreateRecords;
//     let stubGetRecords;
//     let stubCreateRecord;
//     let stubGetRecord;
//     let stubCacheClient;
//     let builtDummyClasses;
//     let dummyClassBuilderArguments;
//
//     let twitterUser;
//     let twitterPhoto;
//     let twitterPhotos;
//
//     beforeEach(function () {
//         process.env.TWITTER_ACCESS_TOKEN = "TWITTER_ACCESS_TOKEN";
//
//         stubPost = Photo.fromJSON({id: "woof"});
//         stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];
//
//         twitterUser = {
//             id: "woof",
//             username: "woofwoof",
//             full_name: "Woof Woof"
//         };
//         twitterPhoto = {
//             id: stubPost.id,
//             type: "image",
//             created_time: DateTime.utc().toISO(),
//             user: twitterUser,
//             images: {
//                 "small": {url: "woof://woof.woof/?size=small", height: 100, width: 100},
//                 "regular": {url: "woof://woof.woof/?size=regular", height: 500, width: 500},
//                 "full": {url: "woof://woof.woof/?size=full", height: 1000, width: 1000}
//             },
//             location: {
//                 latitude: 49.2845,
//                 longitude: -123.1116,
//                 name: "SFU Vancouver"
//             },
//             caption: {
//                 text: "Woof!"
//             }
//         };
//         twitterPhotos = stubPosts.map(stubPost => Object.assign({}, twitterPhoto, {id: stubPost.id}));
//         delete twitterPhotos[0].location;
//         delete twitterPhotos[1].caption;
//         twitterPhotos[2].type = "carousel";
//         stubServiceClient = {
//             media: sinon.stub().callsFake(postId => {
//                 return Promise.resolve({
//                     data: twitterPhotos.find(twitterBlogPost => twitterBlogPost.id === postId)
//                 });
//             }),
//             userSelfMedia: sinon.stub().callsFake(params => { // eslint-disable-line no-unused-vars
//                 let posts = twitterPhotos.concat({id: "foo", type: "foo"});
//
//                 if (params.count === 42) { // NOTE-RT: 42 is a sentinel value for an empty array
//                     posts = [];
//                 }
//
//                 if (stubServiceClient.userSelfMedia.callCount > 1) {
//                     posts = [];
//                 }
//
//                 return Promise.resolve({
//                     data: posts
//                 });
//             })
//         };
//
//         stubBeforeRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
//         stubRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
//         stubAfterRecordsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars
//
//         stubBeforeRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
//         stubRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
//         stubAfterRecordGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars
//
//         stubBeforeCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
//         stubCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
//         stubAfterCachedRecordsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars
//
//         stubBeforeCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
//         stubCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
//         stubAfterCachedRecordGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars
//
//         stubInstanceToRecord = sinon.stub().callsFake(Photo.fromJSON);
//
//         stubCreateRecords = sinon.stub().callsFake(posts => timedPromise(posts));
//         stubGetRecords = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
//
//         stubCreateRecord = sinon.stub().callsFake(post => timedPromise(post));
//         stubGetRecord = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars
//
//         dummyClassBuilderArguments = {
//             stubBeforeRecordsGetter,
//             stubRecordsGetter,
//             stubAfterRecordsGetter,
//
//             stubBeforeRecordGetter,
//             stubRecordGetter,
//             stubAfterRecordGetter,
//
//             stubBeforeCachedRecordsGetter,
//             stubCachedRecordsGetter,
//             stubAfterCachedRecordsGetter,
//
//             stubBeforeCachedRecordGetter,
//             stubCachedRecordGetter,
//             stubAfterCachedRecordGetter,
//
//             stubInstanceToRecord,
//
//             stubGetRecords,
//             stubCreateRecords,
//
//             stubGetRecord,
//             stubCreateRecord
//         };
//         builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);
//
//         DummyCacheClient = builtDummyClasses.DummyCacheClient;
//
//         stubCacheClient = new DummyCacheClient("ᶘ ◕ᴥ◕ᶅ");
//
//         // FIXME-RT: Ugh. Gross af, but I really don't want to proxyquire right now. https://stackoverflow.com/questions/43960646/testing-mocking-node-fetch-dependency-that-it-is-used-in-a-class-method
//         sinon.stub(fetch, "Promise").returns(Promise.resolve({
//             json: () => {
//                 return {
//                     graphql: {
//                         shortcode_media: {
//                             display_url: "woof://woof.woof/woof",
//                             display_resources: [
//                                 {
//                                     src: "woof://woof.woof/woof",
//                                     config_width: 640,
//                                     config_height: 640
//                                 },
//                                 {
//                                     src: "woof://woof.woof/woof",
//                                     config_width: 750,
//                                     config_height: 750
//                                 },
//                                 {
//                                     src: "woof://woof.woof/woof",
//                                     config_width: 1080,
//                                     config_height: 1080
//                                 }
//                             ],
//                             dimensions: {
//                                 width: 1080,
//                                 height: 1080
//                             },
//                             edge_sidecar_to_children: {
//                                 edges: [
//                                     {
//                                         node: {
//                                             display_url: "woof://woof.woof/woof",
//                                             display_resources: [
//                                                 {
//                                                     src: "woof://woof.woof/woof",
//                                                     config_width: 640,
//                                                     config_height: 640
//                                                 },
//                                                 {
//                                                     src: "woof://woof.woof/woof",
//                                                     config_width: 750,
//                                                     config_height: 750
//                                                 },
//                                                 {
//                                                     src: "woof://woof.woof/woof",
//                                                     config_width: 1080,
//                                                     config_height: 1080
//                                                 }
//                                             ],
//                                             dimensions: {
//                                                 width: 1080,
//                                                 height: 1080
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         }
//                     }
//                 };
//             }
//         }));
//     });
//
//     afterEach(function () {
//         fetch.Promise.restore();
//     });
//
//     describe("constructor", function () {
//         it("should build a `TwitterSource` instance (including the default `twitter` client)", function () {
//             const twitterSource = new TwitterSource(null, stubCacheClient);
//
//             expect(TwitterSource.type).to.eql("twitter");
//             // expect(twitterSource.client).to.be.instanceof(Twitter); // NOTE-RT: It's not so much a class as it is just an exported anonymous function
//             expect(twitterSource.cacheClient).to.eql(stubCacheClient);
//             expect(twitterSource.initializing).to.be.instanceOf(Promise);
//             expect(twitterSource).to.be.instanceOf(TwitterSource);
//         });
//
//         it("should build a `TwitterSource` instance (with stubbed client)", function () {
//             const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
//
//             expect(TwitterSource.type).to.eql("twitter");
//             expect(twitterSource.client).to.eql(stubServiceClient);
//             expect(twitterSource.cacheClient).to.eql(stubCacheClient);
//             expect(twitterSource.initializing).to.be.instanceOf(Promise);
//             expect(twitterSource).to.be.instanceOf(TwitterSource);
//         });
//     });
//
//     describe("AuthInfoClient", function () {
//         it("returns `TwitterAuthInfo`", function () {
//             expect(TwitterSource.AuthInfoClient).to.eql(TwitterAuthInfo);
//         });
//     });
//
//     describe("isEnabled", function () {
//         it("`isEnabled` if `process.env.TWITTER_ACCESS_TOKEN` is defined", function () {
//             const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
//             expect(twitterSource.isEnabled).to.eql(true);
//         });
//
//         it("`!isEnabled` if `process.env.TWITTER_ACCESS_TOKEN` is not defined", function () {
//             delete process.env.TWITTER_ACCESS_TOKEN;
//             const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
//             expect(twitterSource.isEnabled).to.eql(false);
//         });
//     });
//
//     describe("recordsGetter", function () {
//         it("passes `serviceClient` the expected parameters", function () {
//             const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
//             const stubParams = PostSearchParams.fromJS({perPage: 30, min_id: "meow", max_id: "grr"});
//
//             return twitterSource.recordsGetter(stubParams)
//                 .then(posts => {
//                     expect(posts).to.be.instanceof(Array);
//                     posts.map(post => {
//                         switch (post.type) {
//                             case Gallery.type:
//                                 expect(post).to.be.instanceof(Gallery);
//                                 break;
//
//                             case Photo.type:
//                             default:
//                                 expect(post).to.be.instanceof(Photo);
//                                 break;
//                         }
//                     });
//                     sinon.assert.calledOnce(stubServiceClient.userSelfMedia);
//                     sinon.assert.calledWith(stubServiceClient.userSelfMedia, sinon.match({count: stubParams.perPage}));
//                 });
//         });
//
//         it("finds no posts", function () {
//             const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
//             const stubParams = PostSearchParams.fromJS({perPage: 42});
//
//             return twitterSource.recordsGetter(stubParams)
//                 .then(posts => {
//                     expect(posts).to.be.instanceof(Array);
//                     expect(posts).to.be.empty;
//                     sinon.assert.calledOnce(stubServiceClient.userSelfMedia);
//                     sinon.assert.calledWith(stubServiceClient.userSelfMedia, sinon.match({count: stubParams.perPage}));
//                 });
//         });
//     });
//
//     describe("allRecordsGetter", function () {
//         it("finds all posts", function () {
//             const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
//             const stubParams = PostSearchParams.fromJS({perPage: 40, min_id: "meow", max_id: "grr"});
//
//             return twitterSource.allRecordsGetter(stubParams)
//                 .then(posts => {
//                     expect(posts).to.be.instanceof(Array);
//                     expect(posts).to.have.length(3);
//                     posts.map(post => {
//                         switch (post.type) {
//                             case Gallery.type:
//                                 expect(post).to.be.instanceof(Gallery);
//                                 break;
//
//                             case Photo.type:
//                             default:
//                                 expect(post).to.be.instanceof(Photo);
//                                 break;
//                         }
//                     });
//                     sinon.assert.calledTwice(stubServiceClient.userSelfMedia);
//                     sinon.assert.calledWith(stubServiceClient.userSelfMedia, sinon.match({count: stubParams.perPage}));
//                 });
//         });
//     });
//
//     describe("recordGetter", function () {
//         it("passes `serviceClient` the expected parameters", function () {
//             const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
//
//             return twitterSource.recordGetter(stubPost.id)
//                 .then(post => {
//                     expect(post).to.be.instanceof(Photo);
//                     sinon.assert.calledOnce(stubServiceClient.media);
//                     sinon.assert.calledWith(stubServiceClient.media, stubPost.id);
//                 });
//         });
//
//         it("finds no post", function () {
//             const twitterSource = new TwitterSource(stubServiceClient, stubCacheClient);
//
//             return twitterSource.recordGetter("foo")
//                 .then(post => {
//                     expect(post).to.not.be.ok;
//                     sinon.assert.calledOnce(stubServiceClient.media);
//                     sinon.assert.calledWith(stubServiceClient.media, "foo");
//                 });
//         });
//     });
// });
