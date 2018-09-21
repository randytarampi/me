import {fromJS, Map, Record} from "immutable";

export class Character extends Record({
    id: null,
    position: null,
    character: null,
    meta: Map()
}) {
    static fromJSON(json) {
        return Character.fromJS(json);
    }

    static fromJS({meta, ...js}) {
        return new this({
            ...js,
            meta: meta
                ? fromJS(meta)
                : Map()
        });
    }

    toString() {
        return this.character;
    }
}

export default Character;
