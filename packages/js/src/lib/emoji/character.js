// @ts-check
import {fromJS, Map, Record} from "immutable";

/** A character slot inside an emoji string. */
export class Character extends Record({
    id: null,
    position: null,
    character: null,
    meta: Map()
}) {
    /** @param {object} json - Raw character data. @returns {Character} */
    static fromJSON(json) {
        return Character.fromJS(json);
    }

    /** @param {object} js - Raw character data. @returns {Character} */
    static fromJS({meta, ...js}) {
        return new this({
            ...js,
            meta: meta
                ? fromJS(meta)
                : Map()
        });
    }

    /** @returns {string} The printable character. */
    toString() {
        return this.character;
    }
}

export default Character;
