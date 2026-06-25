import queryString from "query-string";
import Resume from "../resume.js";

export const buildFetchUrlForVariant = variant => {
    return `${process.env.RESUME_SERVICE_URL || (typeof __RESUME_SERVICE_URL__ !== "undefined" ? __RESUME_SERVICE_URL__ : "http://localhost")}/${variant}.json`;
};

export const fetchResumeApi = (variant, searchParams) => {
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
                return Resume.fromResume(json);
            }

            return json;
        });
};

export default fetchResumeApi;
