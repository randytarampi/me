import {mount as enzymeMount} from "enzyme";
import {Provider} from "react-redux";

export const enzymeRendererForRenderFunction = renderFunction => store => (node, options = {}) => renderFunction(node, {
    ...options,
    wrappingComponent: Provider,
    wrappingComponentProps: {
        store
    }
});

export const mount = enzymeRendererForRenderFunction(enzymeMount);

export default mount;
