import {BearGenerator, defaultBearComponents} from "./bear";

const defaultComponents = {
    ...defaultBearComponents,
    leftEye: {id: "leftEye", character: "ಠಿ", position: 5},
    rightEye: {id: "rightEye", character: "ಠ", position: 7},
};

export class DoubtBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default DoubtBear;
