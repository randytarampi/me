// @ts-check
import {EmojiClassGenerator} from "../index.js";

/** Default bear parts, because bears need structure too. */
export const defaultBearComponents = {
    leftAction: {id: "leftAction", position: 1},
    leftLeaningLeftArm: {id: "leftLeaningLeftArm", position: 2},
    leftEar: {id: "leftEar", character: "ʕ", position: 3},
    rightLeaningLeftArm: {id: "rightLeaningLeftArm", position: 4},
    leftEye: {id: "leftEye", character: "•", position: 5},
    nose: {id: "nose", character: "ᴥ", position: 6},
    rightEye: {id: "rightEye", character: "•", position: 7},
    leftLeaningRightArm: {id: "leftLeaningRightArm", position: 8},
    rightEar: {id: "rightEar", character: "ʔ", position: 9},
    rightLeaningRightArm: {id: "rightLeaningRightArm", position: 10},
    rightAction: {id: "rightAction", position: 11}
};

/** @param {object} [otherProperties={}] - Extra bear bits. @returns {Function} A bear record class. */
export const BearGenerator = otherProperties => EmojiClassGenerator({
    type: "bear",
    components: defaultBearComponents,
    ...otherProperties
});

/** The plain bear record. */
export class Bear extends BearGenerator({}) {
}

export default Bear;
