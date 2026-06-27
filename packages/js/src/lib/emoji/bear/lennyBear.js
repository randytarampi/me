// @ts-check
import {BearGenerator, defaultBearComponents} from "./bear.js";

const defaultComponents = {
    ...defaultBearComponents,
    leftEye: {id: "leftEye", character: " ͡°", position: 5},
    rightEye: {id: "rightEye", character: " ͡°", position: 7},
};

/** The classic shrug-adjacent bear. */
export class LennyBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default LennyBear;
