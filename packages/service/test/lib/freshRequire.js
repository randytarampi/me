const getCallerFile = () => {
    const originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;

    const error = new Error();
    Error.captureStackTrace(error, getCallerFile);
    const stack = error.stack;

    Error.prepareStackTrace = originalPrepareStackTrace;

    const callerFrame = stack && stack.find(frame => {
        const fileName = frame && frame.getFileName && frame.getFileName();
        return fileName && fileName !== __filename;
    });

    return callerFrame && callerFrame.getFileName ? callerFrame.getFileName() : undefined;
};

export const freshRequire = modulePath => {
    const path = require("path");
    const callerFile = getCallerFile();
    const callerDir = callerFile
        ? path.dirname(callerFile)
        : process.cwd();
    const isBareModule = !path.isAbsolute(modulePath) && !modulePath.startsWith(".");
    const resolvedModulePath = path.isAbsolute(modulePath)
        ? modulePath
        : modulePath.startsWith(".")
            ? require.resolve(path.resolve(callerDir, modulePath))
            : require.resolve(modulePath, {paths: [callerDir]});
    delete require.cache[resolvedModulePath];
    const moduleExports = require(resolvedModulePath);

    if (isBareModule && moduleExports && typeof moduleExports === "object") {
        const mutableExports = {...moduleExports};

        require.cache[resolvedModulePath] = {
            id: resolvedModulePath,
            filename: resolvedModulePath,
            loaded: true,
            exports: mutableExports
        };

        return mutableExports;
    }

    return moduleExports;
};
