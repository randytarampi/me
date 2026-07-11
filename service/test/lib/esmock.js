// NOTE-RT: esmock must be imported dynamically — see docs/CONVENTIONS.md#testing
const esmock = async (...args) => {
    const {default: esmockFn} = await import("esmock");

    return esmockFn(...args);
};

export default esmock;
export {esmock};
