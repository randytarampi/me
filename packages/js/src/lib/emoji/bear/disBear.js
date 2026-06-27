// @ts-check
import {BearGenerator, defaultBearComponents} from "./bear.js";

const defaultComponents = {
    ...defaultBearComponents,
    leftEye: {id: "leftEye", character: "ಠ", position: 5},
    rightEye: {id: "rightEye", character: "ಠ", position: 7},
};

/** A disapproving bear. */
export class DisBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default DisBear;
