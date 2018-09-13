import fetch from "isomorphic-fetch";
import queryString from "query-string";
import {buildLetter} from "../buildLetter";

export const buildFetchUrlForVariant = variant => {
    return `${__LETTER_SERVICE_URL__}/${variant}.json`;
};

export const fetchLetterApi = (variant, searchParams) => {
    const fetchUrl = buildFetchUrlForVariant(variant);
    const parsedFetchUrl = queryString.parseUrl(fetchUrl);
    return fetch(`${parsedFetchUrl.url}?${queryString.stringify({
        ...parsedFetchUrl.query,
        ...searchParams
    })}`, {
        redirect: "follow",
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        }
    })
        .then(body => {
            if (body.status === 404) {
                return null;
            }

            return body.json();
        })
        .then(json => {
            if (json) {
                return buildLetter(json, variant);
            }

            return null;
        });
};

export default fetchLetterApi;
