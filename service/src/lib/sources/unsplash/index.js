// @ts-check
import {Photo} from "@randy.tarampi/js";
import {createApi} from "unsplash-js";
import CachedDataSource from "../../cachedDataSource.js";
import {filterPostForOrderingConditionsInSearchParams} from "../util.js";

/** Unsplash-backed post source. */
class UnsplashSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || createApi({
                accessKey: process.env.UNSPLASH_API_KEY
            }),
            cacheClient);
    }

    static get type() {
        return "unsplash";
    }

    static instanceToRecord(json) {
        return Photo.fromJSON({
            raw: json,
            id: json.id,
            source: UnsplashSource.type,
            datePublished: json.created_at,
            width: json.width,
            height: json.height,
            sizedPhotos: [
                {url: json.urls.raw, width: json.width, height: json.height, size: "raw"},
                {url: json.urls.full, width: json.width, height: json.height, size: "full"},
                {url: json.urls.regular, width: 1080, size: "regular"},
                {url: json.urls.small, width: 400, size: "small"}
            ],
            sourceUrl: json.links.html,
            creator: {
                id: json.user.id,
                username: json.user.username,
                name: json.user.name,
                url: json.user.links.html,
                image: json.user.profile_image.large
            },
            locationCreated: json.location
                ? {
                    geo: json.location.position
                        ? {
                            latitude: json.location.position.latitude,
                            longitude: json.location.position.longitude
                        }
                        : null,
                    address: {
                        streetAddress: json.location.name,
                        addressLocality: json.location.city,
                        addressCountry: json.location.country
                    },
                    name: json.location.title
                }
                : null
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

    recordsGetter(searchParams) {
        const unsplashRequest = this.client.GET("/users/{username}/photos", {
            params: {
                path: {username: process.env.UNSPLASH_USER_NAME},
                query: {
                    page: searchParams.Unsplash.page,
                    per_page: searchParams.Unsplash.per_page,
                    order_by: searchParams.Unsplash.order_by
                }
            }
        });

        return unsplashRequest
            .then(({data, error}) => {
                if (error) {
                    return [];
                }

                return Promise.all(
                    (data || [])
                        .filter(post => filterPostForOrderingConditionsInSearchParams(UnsplashSource.instanceToRecord(post), searchParams))
                        .map(photo => this.recordGetter(photo.id, searchParams))
                )
                    // NOTE-RT: unlike every other source, Unsplash fetches each photo individually
                    // via `recordGetter`, which resolves `null` on a per-photo API error or missing
                    // data - confirmed live against `service-dev-cachePosts`, where an unfiltered
                    // `null` reached `cacheRecords`/`CacheClient#setRecords` and crashed the whole
                    // Lambda process with an unawaited, uncaught `TypeError: Cannot read properties
                    // of null (reading 'uid')`. Every other source's `recordsGetter` already filters
                    // its mapped records before returning; this one needs to filter `null`s too.
                    .then(photos => photos.filter(photo => photo));
            });
    }

    recordGetter(photoId, searchParams) { // eslint-disable-line no-unused-vars
        return this.client.GET("/photos/{assetSlug}", {
            params: {
                path: {assetSlug: photoId}
            }
        })
            .then(({data, error}) => {
                if (error) {
                    return null;
                }

                // ToS compliance: track download (fire-and-forget)
                if (data) {
                    this.client.GET("/photos/{id}/download", {
                        params: {
                            path: {id: photoId}
                        }
                    }).catch(() => {});
                }

                return data && UnsplashSource.instanceToRecord(data);
            });
    }
}

/** @type {typeof UnsplashSource} */
export default UnsplashSource;
