import F00px from "500px";
import {Creator, Photo, SizedPhoto} from "@randy.tarampi/js";
import PhotoSource from "../photoSource";
import SearchParams from "../searchParams";

class Five00pxSource extends PhotoSource {
    constructor() {
        super("500px", new F00px(process.env.F00PX_API_KEY));
    }

    get isEnabled() {
        return false && // NOTE-RT: API shutdown on 15 June 2018 per https://support.500px.com/hc/en-us/articles/360002435653-API-
            !!process.env["F00PX_API_KEY"] &&
            !!process.env["F00PX_API_SECRET"];
    }

    postsGetter(params) {
        params = params instanceof SearchParams ? params : new SearchParams(params);
        const that = this;
        const client = this.client;
        const userId = process.env.FIVE00PX_USER_ID;
        let f00pxRequest = Promise.resolve(userId);

        if (!userId) {
            f00pxRequest = new Promise((resolve, reject) => {
                client.users.getByName(process.env["F00PX_USER_NAME"], (error, response) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(response.user.id);
                });
            });
        }

        return f00pxRequest
            .then((userId) => {
                return new Promise((resolve, reject) => {
                    client.photos.getByUserId(userId, params.F00px, (error, response) => {
                        if (error) {
                            return reject(error);
                        }

                        resolve(response.photos);
                    });
                });
            })
            .then((photos) => {
                return Promise.all(photos.map((photo) => {
                    return that.jsonToPost(photo);
                }));
            });
    }

    postGetter(id, params) {
        params = params instanceof SearchParams ? params : new SearchParams(params);
        const that = this;
        const client = this.client;

        return new Promise((resolve, reject) => {
            client.photos.getById(id, params.F00px, (error, response) => {
                if (error) {
                    return reject(error);
                }

                resolve(response.photo);
            });
        }).then((photo) => {
            return that.jsonToPost(photo);
        });
    }

    jsonToPost(json) {
        return new Photo(
            json.id,
            null,
            this.type,
            json.taken_at,
            json.created_at,
            json.width,
            json.height,
            json.images.map((image) => {
                return new SizedPhoto(image.url, image.size);
            }),
            `https://www.500px.com${json.url}`,
            json.name,
            json.description,
            new Creator(
                json.user.id,
                json.user.username,
                json.user.fullname,
                `https://www.500px.com/${json.user.username}`
            )
        );
    }
}

export default Five00pxSource;
