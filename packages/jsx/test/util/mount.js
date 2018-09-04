import {mount as enzymeMount} from "enzyme";

export const mount = store => (component, options = {}) => enzymeMount(component, {
    ...options,
    context: {
        store,
        ...options.context
    }
});

export default mount;
