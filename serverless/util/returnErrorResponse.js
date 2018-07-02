import responseBuilder from "./responseBuilder";

export default callback => error => {
    console.error(error); // eslint-disable-line no-console
    callback(error, responseBuilder({
        error: "An unexpected error occurred"
    }, 500));
};
