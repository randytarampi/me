import {shallow as enzymeShallow} from "enzyme";
import {enzymeRendererForRenderFunction} from "./mount";

export const shallow = enzymeRendererForRenderFunction(enzymeShallow);

export default shallow;
