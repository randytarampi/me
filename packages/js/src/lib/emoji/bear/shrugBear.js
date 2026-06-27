// @ts-check
import {BearGenerator, defaultBearComponents} from "./bear.js";

const defaultComponents = {
    ...defaultBearComponents,
    leftAction: {id: "leftAction", character: "¯", position: 1},
    leftLeaningLeftArm: {id: "leftLeaningLeftArm", character: "\\_", position: 2},
    rightLeaningRightArm: {id: "rightLeaningRightArm", character: "_/", position: 10},
    rightAction: {id: "rightAction", character: "¯", position: 11}
};

/** A bear that shrugs harder than most people do. */
export class ShrugBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default ShrugBear;
