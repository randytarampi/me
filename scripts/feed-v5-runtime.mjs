const requiredMajor = 24;
const actual = Number.parseInt(process.versions.node.split(".")[0], 10);

const assertNode24 = () => {
    console.log(`feed:v5 runtime: Node ${process.versions.node} (${process.execPath})`);
    if (actual !== requiredMajor) {
        throw new Error(`feed:v5 requires Node ${requiredMajor}.x; found ${process.versions.node} at ${process.execPath}. Use the repository .nvmrc with nvm/asdf, then retry.`);
    }
};

if (process.argv[1] === import.meta.filename) {
    try {
        assertNode24();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export {assertNode24};
