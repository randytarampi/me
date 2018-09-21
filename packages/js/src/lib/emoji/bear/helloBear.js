import {BearGenerator, defaultBearComponents} from "./bear";

const defaultComponents = {
    ...defaultBearComponents,
    rightLeaningRightArm: {id: "rightLeaningRightArm", character: "ﾉ゛", position: 10},
};

export class HelloBear extends BearGenerator({
    components: defaultComponents
}) {
}

export default HelloBear;
