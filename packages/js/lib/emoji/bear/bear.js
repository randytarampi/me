import {EmojiClassGenerator} from "../";

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

export const BearGenerator = otherProperties => EmojiClassGenerator({
    type: "bear",
    components: defaultBearComponents,
    ...otherProperties
});

export class Bear extends BearGenerator({}) {
}

export default Bear;
