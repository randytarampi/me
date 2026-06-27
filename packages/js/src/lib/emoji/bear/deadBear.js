// @ts-check
import {BearGenerator, defaultBearComponents} from "./bear.js";

const defaultComponents = {
    ...defaultBearComponents,
    leftEye: {id: "leftEye", character: "×", position: 5},
    rightEye: {id: "rightEye", character: "×", position: 7},
};

/** A very not-alive bear. */
export class DeadBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default DeadBear;
