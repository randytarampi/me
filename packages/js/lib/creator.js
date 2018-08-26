import {Record} from "immutable";

class Creator extends Record({
    id: null,
    username: null,
    name: null,
    sourceUrl: null,
    imageUrl: null
}) {
    static fromJS(js) {
        return new Creator(js);
    }

    static fromJSON(json) {
        return Creator.fromJS(json);
    }
}

export default Creator;
