import fetch from "isomorphic-fetch";

export default (fetchUrl, page) => {
    return fetch(`${fetchUrl}?page=${page}`)
        .then(body => body.json())
        .catch(error => {
            console.error(error); // eslint-disable-line no-console
            return [];
        });
};
