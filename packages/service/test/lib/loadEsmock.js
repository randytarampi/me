const path = require("path");
const {fileURLToPath} = require("url");
let esmock;

const loadedModulePaths = new Set();
const mockedModulePaths = new Set();

const cleanupEsmockGlobals = () => {
    delete global.mockKeys;
    delete global.mockKeysSource;
    delete global.esmockCache;
    delete global.esmockCacheGet;
    delete global.esmockTreeIdGet;
};

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

const resolveModulePath = (modulePath, baseDir) => {
    return require.resolve(modulePath, {paths: [baseDir]});
};

const loadEsmock = async () => {
    if (!esmock) {
        esmock = async (modulePath, mocks = {}) => {
            const callerFile = getCallerFile();
            const baseDir = callerFile ? path.dirname(callerFile) : process.cwd();
            const resolvedModulePath = resolveModulePath(modulePath, baseDir);
            const targetBaseDir = path.dirname(resolvedModulePath);

            for (const [mockPath, mockExports] of Object.entries(mocks)) {
                const resolvedMockPath = resolveModulePath(mockPath, targetBaseDir);
                let normalizedMockExports = mockExports;

                if (mockExports && typeof mockExports === "object") {
                    if (Object.prototype.hasOwnProperty.call(mockExports, "default") && (typeof mockExports.default === "function" || typeof mockExports.default === "object")) {
                        normalizedMockExports = mockExports.default;

                        if (normalizedMockExports && typeof normalizedMockExports === "object" || typeof normalizedMockExports === "function") {
                            normalizedMockExports.default = normalizedMockExports;
                        }

                        for (const [mockExportName, mockExportValue] of Object.entries(mockExports)) {
                            if (mockExportName !== "default") {
                                normalizedMockExports[mockExportName] = mockExportValue;
                            }
                        }
                    } else {
                        normalizedMockExports = {...mockExports};
                    }
                }

                delete require.cache[resolvedMockPath];
                require.cache[resolvedMockPath] = {
                    id: resolvedMockPath,
                    filename: resolvedMockPath,
                    loaded: true,
                    exports: normalizedMockExports
                };
                mockedModulePaths.add(resolvedMockPath);
            }

            delete require.cache[resolvedModulePath];
            loadedModulePaths.add(resolvedModulePath);

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
    }

    cleanupEsmockGlobals();
    return esmock;
};

const purgeEsmock = () => {
    for (const modulePath of loadedModulePaths) {
        delete require.cache[modulePath];
    }

    for (const modulePath of mockedModulePaths) {
        delete require.cache[modulePath];
    }

    loadedModulePaths.clear();
    mockedModulePaths.clear();

    cleanupEsmockGlobals();
};
module.exports.loadEsmock = loadEsmock;
module.exports.purgeEsmock = purgeEsmock;
module.exports.default = module.exports;
