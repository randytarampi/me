export default (a, b) => {
    if (a.dateCreated.valueOf() > b.dateCreated.valueOf()) {
        return -1;
    } else if (a.dateCreated.valueOf() < b.dateCreated.valueOf()) {
        return 1;
    } else {
        return 0;
    }
};
