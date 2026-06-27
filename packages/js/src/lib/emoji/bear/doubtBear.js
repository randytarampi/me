// @ts-check
import {BearGenerator, defaultBearComponents} from "./bear.js";

const defaultComponents = {
    ...defaultBearComponents,
    leftEye: {id: "leftEye", character: "ಠಿ", position: 5},
    rightEye: {id: "rightEye", character: "ಠ", position: 7},
};

/** A bear with questions. */
export class DoubtBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default DoubtBear;
