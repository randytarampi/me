import {Map, Record} from "immutable";
import * as util from "../util";
import Character from "./character";

const defaultComponents = {
    leftEye: {id: "leftEye", character: "•", position: 1},
    nose: {id: "nose", character: "ᴥ", position: 2},
    rightEye: {id: "rightEye", character: "•", position: 3}
};

export const EmojiClassGenerator = ({components = defaultComponents, ...otherProperties} = {}) => class AbstractEmoji extends Record({
    id: null,
    type: null,
    components: Map(Object.entries(components).reduce((map, [characterKey, character]) => {
        map[characterKey] = Character.fromJS(character);
        return map;
    }, {})),
    ...otherProperties
}) {
    get components() {
        return this.get("components")
            .filter(character => !!character.character)
            .sort(util.sortCharactersByPosition)
            .toList()
            .toArray();
    }

    static parsePropertiesFromJs({components, ...js} = {}) {
        return {
            ...js,
            components: components && new Map(Object.entries(components).reduce((map, [characterKey, character]) => {
                map[characterKey] = Character.fromJS(character);
                return map;
            }, {}))
        };
    }

    static fromJS(js) {
        return new this(this.parsePropertiesFromJs(js));
    }

    static parsePropertiesFromJson({components, ...json} = {}) {
        return {
            ...json,
            components: components && new Map(Object.entries(components).reduce((map, [characterKey, character]) => {
                map[characterKey] = Character.fromJSON(character);
                return map;
            }, {}))
        };
    }

    static fromJSON(json) {
        return new this(this.parsePropertiesFromJson(json));
    }

    toString() {
        return this.components.join("");
    }
};

export const AbstractEmoji = EmojiClassGenerator();

export class Emoji extends EmojiClassGenerator({type: "emoji"}) {
}

export default Emoji;
