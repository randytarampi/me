const path = require("path");
const {fileURLToPath} = require("url");

const normalizeFileName = fileName => {
    if (!fileName) {
        return undefined;
    }

    return fileName.startsWith("file:")
        ? fileURLToPath(fileName)
        : fileName;
};

const getCallerFile = () => {
    const originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;

    const error = new Error();
    Error.captureStackTrace(error, getCallerFile);
    const stack = error.stack;

    Error.prepareStackTrace = originalPrepareStackTrace;

    const callerFrame = stack && stack.find(frame => {
        const fileName = frame && frame.getFileName && frame.getFileName();
        return normalizeFileName(fileName) && normalizeFileName(fileName) !== __filename;
    });

    return callerFrame && callerFrame.getFileName ? normalizeFileName(callerFrame.getFileName()) : undefined;
};

const freshRequire = modulePath => {
    const callerFile = getCallerFile();
    const resolvedModulePath = require.resolve(modulePath, {paths: [callerFile ? path.dirname(callerFile) : process.cwd()]});

    delete require.cache[resolvedModulePath];
    const moduleExports = require(resolvedModulePath);

    if (moduleExports && typeof moduleExports === "object") {
        const mutableExports = Object.create(Object.getPrototypeOf(moduleExports));

        for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(moduleExports))) {
            Object.defineProperty(mutableExports, key, {
                value: descriptor.get ? descriptor.get.call(moduleExports) : descriptor.value,
                enumerable: descriptor.enumerable,
                writable: true,
                configurable: true
            });
        }

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
module.exports.freshRequire = freshRequire;
module.exports.default = module.exports;
