// @ts-check
import {Map, Record} from "immutable";
import * as util from "../util/index.js";
import Character from "./character.js";

/** The default component map used by a plain emoji. */
export const defaultComponents = {
    leftEye: {id: "leftEye", character: "•", position: 1},
    nose: {id: "nose", character: "ᴥ", position: 2},
    rightEye: {id: "rightEye", character: "•", position: 3}
};

/**
 * Build an emoji record class from a component set.
 * @param {{components?: object, [key: string]: *}} [options={}] - Emoji options.
 * @returns {Function} An emoji record class.
 */
export const EmojiClassGenerator = ({components = defaultComponents, ...otherProperties} = {}) => class AbstractEmoji extends Record({
    id: null,
    type: null,
    components: Map(Object.entries(components).reduce((map, [characterKey, character]) => {
        map[characterKey] = Character.fromJS(character);
        return map;
    }, {})),
    ...otherProperties
}) {
    /** @returns {Array<*>} Printable components, sorted by position. */
    get components() {
        return this.get("components")
            .filter(character => !!character.character)
            .sort(util.sortCharactersByPosition)
            .toList()
            .toArray();
    }

    /** @param {object} [js={}] - Raw JS data. @returns {object} Parsed props. */
    static parsePropertiesFromJs({components, ...js} = {}) {
        return {
            ...js,
            components: components && new Map(Object.entries(components).reduce((map, [characterKey, character]) => {
                map[characterKey] = Character.fromJS(character);
                return map;
            }, {}))
        };
    }

    /** @param {object} js - Raw JS data. @returns {*} */
    static fromJS(js) {
        return new this(this.parsePropertiesFromJs(js));
    }

    /** @param {object} [json={}] - Raw JSON data. @returns {object} Parsed props. */
    static parsePropertiesFromJson({components, ...json} = {}) {
        return {
            ...json,
            components: components && new Map(Object.entries(components).reduce((map, [characterKey, character]) => {
                map[characterKey] = Character.fromJSON(character);
                return map;
            }, {}))
        };
    }

    /** @param {object} json - Raw JSON data. @returns {*} */
    static fromJSON(json) {
        return new this(this.parsePropertiesFromJson(json));
    }

    /** @returns {string} The emoji as a string. */
    toString() {
        return this.components.join("");
    }
};

/** The plain emoji record. */
export const AbstractEmoji = EmojiClassGenerator();

/** The default emoji record. */
export class Emoji extends EmojiClassGenerator({type: "emoji"}) {
}

export default Emoji;
