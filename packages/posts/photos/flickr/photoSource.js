import {Creator, Photo, SizedPhoto} from "@randy.tarampi/js";
import Flickr from "flickr-sdk";
import _ from "lodash";
import Moment from "moment";
import PhotoSource from "../photoSource";

class FlickrSource extends PhotoSource {
    constructor(dataClient, cacheClient) {
        super("Flickr",
            dataClient || new Flickr(process.env.FLICKR_API_KEY),
            cacheClient
        );
    }

    postsGetter(searchParams) {
        const client = this.client;
        const userId = process.env.FLICKR_USER_ID;
        let flickrRequest = Promise.resolve(userId);

        if (!userId) {
            flickrRequest = client.people.findByUsername({
                    username: process.env.FLICKR_USER_NAME
                })
                .then(response => response.body && response.body.user && response.body.user.nsid);
        }

        return flickrRequest
            .then(userId => {
                return client.people.getPublicPhotos(_.extend({
                        user_id: userId
                    }, searchParams.Flickr))
                    .then(response => response.body.photos.photo);
            })
            .then(photos => {
                return photos.map(this.jsonToPost.bind(this));
            });
    }

    jsonToPost(json) {
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
