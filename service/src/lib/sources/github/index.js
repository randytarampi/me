// @ts-check
import {Post} from "@randy.tarampi/js";
import {Octokit} from "@octokit/rest";
import CachedDataSource from "../../cachedDataSource.js";
import {filterPostForOrderingConditionsInSearchParams} from "../util.js";

/** @type {number} */
const GITHUB_API_MAX_POSTS_PER_PAGE = 100;

/** GitHub-backed post source (repos + gists). */
class GitHubSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || new Octokit({auth: process.env.GITHUB_API_KEY}), cacheClient);
    }

    get isEnabled() {
        return !!process.env.GITHUB_API_KEY || false;
    }

    static get type() {
        return "github";
    }

    static instanceToRecord(json) {
        const isGist = !!json.files;
        const files = json.files ? Object.keys(json.files) : [];

        return Post.fromJS({
            raw: json,
            id: String(json.id),
            source: GitHubSource.type,
            datePublished: json.pushed_at || json.updated_at || json.created_at,
            dateCreated: json.created_at,
            title: isGist
                ? (json.description || `Gist: ${json.id}`)
                : json.name,
            body: json.description || null,
            sourceUrl: json.html_url,
            creator: {
                id: json.owner?.login || "github",
                username: json.owner?.login || "github",
                url: json.owner?.html_url || "https://github.com"
            },
            tags: isGist ? files : (json.topics || [])
        });
    }

    async allRecordsGetter(searchParams) {
        let posts = await this.recordsGetter(searchParams);

        if (posts.length) {
            posts = posts.concat(await this.allRecordsGetter(
                searchParams
                    .set("all", true)
                    .set("page", searchParams.page + 1)
            ));
        }

        return posts;
    }

    async recordsGetter(searchParams) {
        const username = process.env.GITHUB_USER_NAME;
        const page = searchParams.page;
        const perPage = Math.min(searchParams.perPage, GITHUB_API_MAX_POSTS_PER_PAGE);

        const [reposResponse, gistsResponse] = await Promise.all([
            this.client.rest.repos.listForUser({
                username,
                type: "owner",
                sort: "pushed",
                direction: "desc",
                page,
                per_page: perPage
            }),
            this.client.rest.gists.listForUser({
                username,
                per_page: perPage
            })
        ]);

        const repos = reposResponse.data || [];
        const gists = gistsResponse.data || [];

        return [...repos, ...gists]
            .map(GitHubSource.instanceToRecord)
            .filter(post => filterPostForOrderingConditionsInSearchParams(post, searchParams));
    }
}

/** @type {typeof GitHubSource} */
export default GitHubSource;

export {GITHUB_API_MAX_POSTS_PER_PAGE};
