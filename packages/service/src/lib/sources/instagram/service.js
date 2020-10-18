import {getMediaForUser} from "instagram-graph-sdk";
import fetch from "isomorphic-fetch";

export const baseUrl = "https://graph.facebook.com/v8.0";

export class InstagramClient {
    constructor(userId, accessToken) {
        this.userId = userId;
        this.accessToken = accessToken;
        this.fields = [
            "caption",
            "children",
            "comments ",
            "comments_count",
            "id",
            "ig_id",
            "insights",
            "is_comment_enabled",
            "like_count",
            "media_type",
            "media_url",
            "owner",
            "permalink",
            "shortcode",
            "thumbnail_url",
            "timestamp",
            "username"
        ];
    }

    userSelfMedia(searchParams) {
        return getMediaForUser({
            user_id: this.userId,
            access_token: this.accessToken,
            fields: this.fields,
            ...searchParams
        });
    }

    media(mediaId) {
        return fetch(`${baseUrl}/${mediaId}?access_token=${this.accessToken}&fields=${this.fields.join(",")}`);
    }
}

export default InstagramClient;
