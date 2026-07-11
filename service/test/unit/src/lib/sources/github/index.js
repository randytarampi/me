import {Post, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams.js";
import GitHubSource, {GITHUB_API_MAX_POSTS_PER_PAGE} from "../../../../../../src/lib/sources/github/index.js";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator.js";

describe("GitHubSource", function () {
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

    let githubRepo;
    let githubGist;
    let githubRepos;
    let githubGists;

    beforeEach(function () {
        process.env.GITHUB_API_KEY = "GITHUB_API_KEY";
        process.env.GITHUB_USER_NAME = "randytarampi";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"})];

        githubRepo = {
            id: 12345,
            name: "me",
            description: "My personal site monorepo",
            html_url: "https://github.com/randytarampi/me",
            created_at: "2020-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
            pushed_at: "2024-06-15T00:00:00Z",
            language: "JavaScript",
            stargazers_count: 5,
            forks_count: 2,
            topics: ["personal-site", "monorepo"],
            homepage: "https://www.randytarampi.ca",
            owner: {
                login: "randytarampi",
                html_url: "https://github.com/randytarampi"
            }
        };
        githubGist = {
            id: "abc123def456",
            description: "A useful gist",
            html_url: "https://gist.github.com/randytarampi/abc123def456",
            created_at: "2023-06-01T00:00:00Z",
            updated_at: "2024-03-15T00:00:00Z",
            files: {
                "script.sh": {},
                "README.md": {}
            },
            owner: {
                login: "randytarampi",
                html_url: "https://github.com/randytarampi"
            }
        };
        githubRepos = [githubRepo, {
            ...githubRepo,
            id: 67890,
            name: "dotfiles",
            description: "My dotfiles"
        }];
        githubGists = [githubGist, {
            ...githubGist,
            id: "xyz789",
            description: "Another gist",
            files: {"notes.txt": {}}
        }];

        const listForUserStub = sinon.stub().callsFake(params => {
            if (params.type === "owner") {
                let repos = githubRepos;

                if (params.per_page === 420) {
                    repos = [];
                }

                if (listForUserStub.callCount > 1) {
                    repos = [];
                }

                return Promise.resolve({data: repos});
            }

            return Promise.resolve({data: []});
        });
        const listGistsForUserStub = sinon.stub().callsFake(params => {
            let gists = githubGists;

            if (params.per_page === 420) {
                gists = [];
            }

            if (listGistsForUserStub.callCount > 1) {
                gists = [];
            }

            return Promise.resolve({data: gists});
        });

        stubServiceClient = {
            rest: {
                repos: {
                    listForUser: listForUserStub
                },
                gists: {
                    listForUser: listGistsForUserStub
                }
            }
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
        it("should build a `GitHubSource` instance (including the default `Octokit` client)", function () {
            const gitHubSource = new GitHubSource(null, stubCacheClient);

            expect(GitHubSource.type).to.eql("github");
            expect(gitHubSource.client).to.be.an("object");
            expect(gitHubSource.client.rest).to.be.an("object");
            expect(gitHubSource.cacheClient).to.eql(stubCacheClient);
            expect(gitHubSource.initializing).to.be.instanceOf(Promise);
            expect(gitHubSource).to.be.instanceOf(GitHubSource);
        });

        it("should build a `GitHubSource` instance (with stubbed client)", function () {
            const gitHubSource = new GitHubSource(stubServiceClient, stubCacheClient);

            expect(GitHubSource.type).to.eql("github");
            expect(gitHubSource.client).to.eql(stubServiceClient);
            expect(gitHubSource.cacheClient).to.eql(stubCacheClient);
            expect(gitHubSource.initializing).to.be.instanceOf(Promise);
            expect(gitHubSource).to.be.instanceOf(GitHubSource);
        });
    });

    describe("type", function () {
        it("returns 'github'", function () {
            expect(GitHubSource.type).to.eql("github");
        });
    });

    describe("isEnabled", function () {
        it("returns true when GITHUB_API_KEY is set", function () {
            const gitHubSource = new GitHubSource(stubServiceClient, stubCacheClient);
            expect(gitHubSource.isEnabled).to.be.true;
        });

        it("returns false when GITHUB_API_KEY is not set", function () {
            delete process.env.GITHUB_API_KEY;
            const gitHubSource = new GitHubSource(stubServiceClient, stubCacheClient);
            expect(gitHubSource.isEnabled).to.be.false;
        });
    });

    describe("instanceToRecord", function () {
        it("turns a GitHub repo response into a `Post`", function () {
            const post = GitHubSource.instanceToRecord(githubRepo);

            expect(post).to.be.instanceOf(Post);
            expect(post.id).to.eql("12345");
            expect(post.source).to.eql("github");
            expect(post.title).to.eql("me");
            expect(post.body).to.eql("My personal site monorepo");
            expect(post.sourceUrl).to.eql("https://github.com/randytarampi/me");
            expect(post.datePublished).to.be.instanceOf(DateTime);
            expect(post.dateCreated).to.be.instanceOf(DateTime);
            expect(post.creator.username).to.eql("randytarampi");
            expect(post.tags.toArray()).to.eql(["personal-site", "monorepo"]);
        });

        it("turns a GitHub gist response into a `Post`", function () {
            const post = GitHubSource.instanceToRecord(githubGist);

            expect(post).to.be.instanceOf(Post);
            expect(post.id).to.eql("abc123def456");
            expect(post.source).to.eql("github");
            expect(post.title).to.eql("A useful gist");
            expect(post.body).to.eql("A useful gist");
            expect(post.sourceUrl).to.eql("https://gist.github.com/randytarampi/abc123def456");
            expect(post.datePublished).to.be.instanceOf(DateTime);
            expect(post.dateCreated).to.be.instanceOf(DateTime);
            expect(post.creator.username).to.eql("randytarampi");
            expect(post.tags.toArray()).to.eql(["script.sh", "README.md"]);
        });

        it("turns a gist without description into a `Post` with a fallback title", function () {
            const gistWithoutDescription = {
                ...githubGist,
                description: null
            };
            const post = GitHubSource.instanceToRecord(gistWithoutDescription);

            expect(post).to.be.instanceOf(Post);
            expect(post.title).to.eql(`Gist: ${gistWithoutDescription.id}`);
            expect(post.body).to.eql(null);
        });
    });

    describe("recordsGetter", function () {
        it("passes `serviceClient` the expected parameters and returns combined repos and gists", function () {
            const gitHubSource = new GitHubSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, page: 2});

            return gitHubSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(githubRepos.length + githubGists.length);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledWith(stubServiceClient.rest.repos.listForUser, {
                        username: process.env.GITHUB_USER_NAME,
                        type: "owner",
                        sort: "pushed",
                        direction: "desc",
                        page: stubParams.page,
                        per_page: stubParams.perPage
                    });
                    sinon.assert.calledWith(stubServiceClient.rest.gists.listForUser, {
                        username: process.env.GITHUB_USER_NAME,
                        per_page: stubParams.perPage
                    });
                });
        });

        it("finds no posts when both APIs return empty", function () {
            const gitHubSource = new GitHubSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30});

            // Override stubs to return empty data
            stubServiceClient.rest.repos.listForUser = sinon.stub().resolves({data: []});
            stubServiceClient.rest.gists.listForUser = sinon.stub().resolves({data: []});

            return gitHubSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledWith(stubServiceClient.rest.repos.listForUser, {
                        username: process.env.GITHUB_USER_NAME,
                        type: "owner",
                        sort: "pushed",
                        direction: "desc",
                        page: 1,
                        per_page: stubParams.perPage
                    });
                    sinon.assert.calledWith(stubServiceClient.rest.gists.listForUser, {
                        username: process.env.GITHUB_USER_NAME,
                        per_page: stubParams.perPage
                    });
                });
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts across pages", function () {
            const gitHubSource = new GitHubSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30});

            return gitHubSource.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(githubRepos.length + githubGists.length);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledWith(stubServiceClient.rest.repos.listForUser, {
                        username: process.env.GITHUB_USER_NAME,
                        type: "owner",
                        sort: "pushed",
                        direction: "desc",
                        page: 1,
                        per_page: stubParams.perPage
                    });
                    sinon.assert.calledWith(stubServiceClient.rest.gists.listForUser, {
                        username: process.env.GITHUB_USER_NAME,
                        per_page: stubParams.perPage
                    });
                });
        });
    });

    describe("recordGetter", function () {
        it("requires implementation", function () {
            const gitHubSource = new GitHubSource(stubServiceClient, stubCacheClient);
            expect(gitHubSource).to.be.instanceOf(GitHubSource);

            return gitHubSource.recordGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordGetter implementation/);
                });
        });
    });
});
