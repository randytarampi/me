import {shallow as enzymeShallow} from "enzyme";

export const shallow = store => (component, options = {}) => {
    const augmentedOptions = {
        ...options,
        context: {
            store,
            ...options.context
        }
    };

    return enzymeShallow(component, augmentedOptions);
};

export default shallow;
