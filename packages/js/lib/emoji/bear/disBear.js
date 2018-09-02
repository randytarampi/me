import {BearGenerator, defaultBearComponents} from "./bear";

const defaultComponents = {
    ...defaultBearComponents,
    leftEye: {id: "leftEye", character: "ಠ", position: 5},
    rightEye: {id: "rightEye", character: "ಠ", position: 7},
};

export class DisBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default DisBear;
