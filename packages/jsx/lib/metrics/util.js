export const buildEventDetails = details => {
    return {
        name: "",
        value: "",
        type: "",
        ...details,
        timestamp: new Date().valueOf()
    };
};

export const buildReduxActionEventDetails = (action, supplementaryDetails) => {
    return buildEventDetails({
        ...supplementaryDetails,
        type: action.type
    });
};
