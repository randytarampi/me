import {Photo} from "@randy.tarampi/js";
import Flickr from "flickr-sdk";
import _ from "lodash";
import {DateTime} from "luxon";
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
        return Photo.fromJS({
            id: json.id,
            source: this.type,
            dateCreated: DateTime.fromMillis(parseInt(json.datetaken, 10) * 1000),
            datePublished: DateTime.fromMillis(parseInt(json.dateupload, 10) * 1000),
            width: json.width_o,
            height: json.height_o,
            sizedPhotos: [
                {url: json.url_o, width: json.width_o, height: json.height_o, size: "raw"},
                {url: json.url_o, width: json.width_o, height: json.height_o, size: "full"},
                {url: json.url_k, width: json.width_k, height: json.height_k},
                {url: json.url_h, width: json.width_h, height: json.height_h},
                {url: json.url_c, width: json.width_c, height: json.height_c},
                {url: json.url_z, width: json.width_z, height: json.height_z},
                {url: json.url_m, width: json.width_m, height: json.height_m},
                {url: json.url_n, width: json.width_n, height: json.height_n}
            ],
            sourceUrl: `https://www.flickr.com/${json.pathalias}/${json.id}`,
            title: json.title,
            body: json.description && json.description._content,
            creator: {
                id: json.owner,
                username: json.ownername,
                sourceUrl: `https://www.flickr.com/${json.ownername}`
            }
        });
    }
}

export default FlickrSource;
