class Creator {
    constructor(id, username, name, sourceUrl) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.sourceUrl = sourceUrl;
    }

    static fromJSON(json) {
        return new Creator(
            json.id,
            json.username,
            json.name,
            json.sourceUrl
        );
    }
}

export default Creator;
