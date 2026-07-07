import queryString from "query-string";
import Resume from "../resume.js";

export const buildFetchUrlForVariant = variant => {
    // NOTE-RT: `process` isn't polyfilled in webpack5 browser bundles (unlike webpack4), so a bare
    // NOTE-RT: `process.env.RESUME_SERVICE_URL` reference throws a ReferenceError ("Can't find
    // NOTE-RT: variable: process") at runtime in the browser. Guard the `process` access itself so
    // NOTE-RT: this still works in Node (tests/dev) while falling back to the babel-replaced
    // NOTE-RT: `__RESUME_SERVICE_URL__` constant (always defined at build time) in the browser.
    return `${(typeof process !== "undefined" && process.env && process.env.RESUME_SERVICE_URL) || (typeof __RESUME_SERVICE_URL__ !== "undefined" ? __RESUME_SERVICE_URL__ : "http://localhost")}/${variant}.json`;
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
