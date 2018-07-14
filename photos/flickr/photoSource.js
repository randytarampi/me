import Creator from "@randy.tarampi/js/lib/creator";
import Photo from "@randy.tarampi/js/lib/photo";
import SizedPhoto from "@randy.tarampi/js/lib/sizedPhoto";
import Flickr from "flickrapi";
import _ from "lodash";
import Moment from "moment";
import PhotoSource from "../photoSource";
import SearchParams from "../searchParams";

class FlickrSource extends PhotoSource {
    constructor() {
        super("Flickr", null, new Promise((resolve, reject) => {
            Flickr.tokenOnly({
                api_key: process.env.FLICKR_API_KEY,
                secret: process.env.FLICKR_API_SECRET
            }, function (error, flickr) {
                if (error) {
                    return reject(error);
                }

                resolve(flickr);
            });
        }));
    }

    getUserPhotos(params) {
        params = params instanceof SearchParams ? params : new SearchParams(params);
        const that = this;
        const client = this.client;
        const userId = process.env.FLICKR_USER_ID;
        let flickrRequest = Promise.resolve(userId);

        if (!userId) {
            flickrRequest = new Promise((resolve, reject) => {
                client.people.findByUsername({
                    username: process.env.FLICKR_USER_NAME
                }, (error, response) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(response.user.nsid);
                });
            });
        }

        return flickrRequest
            .then((userId) => {
                return new Promise((resolve, reject) => {
                    client.people.getPublicPhotos(_.extend({
                        user_id: userId
                    }, params.Flickr), (error, response) => {
                        if (error) {
                            return reject(error);
                        }

                        resolve(response.photos.photo);
                    });
                });
            })
            .then((photos) => {
                return photos.map((photo) => {
                    return that.jsonToPhoto((photo));
                });
            });
    }

    jsonToPhoto(json) {
        return new Photo(
            json.id,
            null,
            this.type,
            json.datetaken,
            Moment(parseInt(json.dateupload, 10) * 1000),
            json.width_o,
            json.height_o,
            [
                new SizedPhoto(json.url_o, json.width_o, json.height_o, "raw"),
                new SizedPhoto(json.url_o, json.width_o, json.height_o, "full"),
                new SizedPhoto(json.url_k, json.width_k, json.height_k),
                new SizedPhoto(json.url_h, json.width_h, json.height_h),
                new SizedPhoto(json.url_c, json.width_c, json.height_c),
                new SizedPhoto(json.url_z, json.width_z, json.height_z),
                new SizedPhoto(json.url_m, json.width_m, json.height_m),
                new SizedPhoto(json.url_n, json.width_n, json.height_n)
            ],
            `https://www.flickr.com/${json.pathalias}/${json.id}`,
            json.title,
            json.description && json.description._content,
            new Creator(
                json.owner,
                json.ownername,
                null,
                `https://www.flickr.com/${json.ownername}`
            )
        );
    }
}

export default FlickrSource;
