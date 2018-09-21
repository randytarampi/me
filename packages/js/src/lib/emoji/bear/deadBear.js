import {BearGenerator, defaultBearComponents} from "./bear";

const defaultComponents = {
    ...defaultBearComponents,
    leftEye: {id: "leftEye", character: "×", position: 5},
    rightEye: {id: "rightEye", character: "×", position: 7},
};

export class DeadBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default DeadBear;
